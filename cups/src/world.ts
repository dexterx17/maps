import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createLights } from './components/lights';
import { createCube } from './components/cube';
import { createSphere } from './components/sphere';
import { createDebugger } from './components/debugger';
import { createLoadingManager } from './components/loadingManager';


import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/resizer';
import { Loop } from './systems/loop';

import { projectState } from './state/project-state';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Project } from './models/project';
import { Color, TextureLoader, Texture } from 'three';
import { autobind } from './decorators/autobind';

class World{
    container: HTMLElement;
    camera: THREE.PerspectiveCamera = null;
    scene: THREE.Scene = null;
    renderer: THREE.WebGLRenderer = null;
    loop: Loop = null;
    controls: OrbitControls = null;
    projects: Project[] = [];
    gui = null;
    loadingManager = null;

    constructor(container: HTMLElement) {
        // create debugger
        this.gui = createDebugger();
        this.container = container;
        
        // create camera for world
        this.camera = createCamera();
        // debug camera positions
        this.gui.add(this.camera.rotation, 'x').min(-3).max(3).step(0.01).name('Camera X');
        this.gui.add(this.camera.rotation, 'y').min(-3).max(3).step(0.01).name('Camera Y');
        this.gui.add(this.camera.rotation, 'z').min(-3).max(3).step(0.01).name('Camera Z');

        this.loadingManager = createLoadingManager();

        this.scene = createScene();
        this.renderer = createRenderer();
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        this.controls = new OrbitControls(this.camera, container);
        container.append(this.renderer.domElement)


        const textureLoader = new TextureLoader(this.loadingManager);
        const matcapTextexture = textureLoader.load('/assets/textures/matcaps/1.png');
        
        const cube = createCube();

        const light = createLights();
        // debug lights positions
        this.gui.add(light.position, 'x').min(-10).max(10).step(0.01).name('Light X');
        this.gui.add(light.position, 'y').min(-10).max(10).step(0.01).name('Light Y');
        this.gui.add(light.position, 'z').min(-10).max(10).step(0.01).name('Light Z');

        this.loop.updatables.push(cube);

        this.scene.add(cube, light);       

        const resizer = new Resizer(container, this.camera, this.renderer);
        // resizer.onResize = () => {
        //     this.render();
        // };
            
        projectState.addListener((projects: Project[]) => {
                
            console.log('setColor', projectState.active);
            cube.material.color = new Color(projectState.active.color);
            console.log('setDesign', projectState.active.desing);
            textureLoader.load(projectState.active.desing, (texture) => {
                
                cube.material.map = matcapTextexture;
                console.log('texture', texture);
                //cube.material.needsUpdate = true;
                cube.material.map.needsUpdate = true;
                this.render()
            });
        });



        
        //const colorTexture = textureLoader.load('/textures/minecraft.png');


        this.handleResize();
        this.handleFullScreen();
    }

    renderProjects(){
        
    }

    render(){
        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.loop.start();
    }
      
    stop() {
        this.loop.stop();
    }

    
    handleResize(){
        window.addEventListener('resize', () => {
            console.log('resize')
            //update aspce caemra
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix()

            //update renderer 
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        });
    }

    handleFullScreen(){
        window.addEventListener('dblclick',() => {
    
            const fullscreenElement = document.fullscreenElement || document.webkitFullscriptElement;
        
            if( !fullscreenElement){
                console.log('go fullscreen');
                if(this.container?.requestFullscreen){
                    this.container.requestFullscreen();
                }else if (this.container.webkitRequestFullscreen){
                    this.container.webkitRequestFullscreen();
                }
            }else{
                console.log('leave screen');
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }else if(document.webkitExitFullscreen){
                    document.webkitExitFullscreen();
                }
            }
        });
    }

}

export { World };