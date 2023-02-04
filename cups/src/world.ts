import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createLights } from './components/lights';
import { createCube } from './components/cube';
import { createSphere } from './components/sphere';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/resizer';
import { Loop } from './systems/loop';

import { projectState } from './state/project-state';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Project } from './models/project';
import { Color } from 'three';
import { autobind } from './decorators/autobind';

class World{
    container: HTMLElement;
    camera: THREE.PerspectiveCamera = null;
    scene: THREE.Scene = null;
    renderer: THREE.WebGLRenderer = null;
    loop: Loop = null;
    controls: OrbitControls = null;
    projects: Project[] = [];

    constructor(container: HTMLElement){
        this.container = container;
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        this.controls = new OrbitControls(this.camera, container);
        container.append(this.renderer.domElement)

        const cube = createCube();

        const light = createLights();

        this.loop.updatables.push(cube);

        this.scene.add(cube, light);       

        const resizer = new Resizer(container, this.camera, this.renderer);
        // resizer.onResize = () => {
        //     this.render();
        // };
            
        projectState.addListener((projects: Project[]) => {
                
            console.log('setColor', projectState.active);
            cube.material.color = new Color(projectState.active.color);
            //this.render()
        });

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