import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createDirectionalLight, createPointLight, createSpotLight } from './components/lights';
import { createCube } from './components/cube';
import { createText } from './components/text';
import { createPlane } from './components/plane';
import { createSphere } from './components/sphere';
import { createDebugger } from './components/debugger';
import { createLoadingManager } from './components/loadingManager';


import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/resizer';
import { Loop } from './systems/loop';

import { projectState } from './state/project-state';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Project } from './models/project';
import { Color, TextureLoader, Texture, AmbientLight, PointLightHelper, CameraHelper } from 'three';
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
        // this.gui.add(this.camera.rotation, 'x').min(-3).max(3).step(0.01).name('Camera X');
        // this.gui.add(this.camera.rotation, 'y').min(-3).max(3).step(0.01).name('Camera Y');
        // this.gui.add(this.camera.rotation, 'z').min(-3).max(3).step(0.01).name('Camera Z');

        this.loadingManager = createLoadingManager();

        this.scene = createScene();
        this.renderer = createRenderer();
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        this.controls = new OrbitControls(this.camera, container);
        container.append(this.renderer.domElement)

        const lightsFolder = this.gui.addFolder('Lights')

        /**
         * Lights
         */
        //ambient light
        const ambientLight = new AmbientLight(0xffffff,0.3);
        this.scene.add(ambientLight);

        const directionalLight = createDirectionalLight();
        this.scene.add(directionalLight);  

        //left light
        const leftLight = createPointLight();
        //leftLight.intensity = 2.5;
        leftLight.position.set(-5, 4, 0);
        this.scene.add(leftLight);  

        //right light
        const rightLight = createPointLight();
        rightLight.position.set(5, 4, 0);
        this.scene.add(rightLight);
        
        const spotLight = createSpotLight();
        this.scene.add(spotLight);
        

        /**
         * Light helpers
         */
        
        const directionLightCameraHelper = new CameraHelper(directionalLight.shadow.camera);
        directionLightCameraHelper.visible = true;
        this.scene.add(directionLightCameraHelper);

        const leftPointLightHelper = new PointLightHelper(leftLight);
        leftPointLightHelper.visible = true;
        this.scene.add(leftPointLightHelper);
        
        const rightPointLightHelper = new PointLightHelper(rightLight);
        rightPointLightHelper.visible = true;
        this.scene.add(rightPointLightHelper);
        
        const spotLightCameraHelper = new CameraHelper(spotLight.shadow.camera);
        spotLightCameraHelper.visible = true;
        this.scene.add(spotLightCameraHelper);

        /**
         * Debug Lights
         */
        // debug lights positions
        const ambientLightsFolder = lightsFolder.addFolder('Ambiental Light');
        ambientLightsFolder.add(ambientLight, 'visible').name('Visibility');
        ambientLightsFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('Intensity');
        ambientLightsFolder.addColor(ambientLight, 'color').onChange((data) => {            
            let color = new Color(data.r/255, data.g/255, data.b/255);
            ambientLight.color = color;
        });

        const directionarLightsFolder = lightsFolder.addFolder('Directional Light');
        directionarLightsFolder.add(directionalLight, 'visible').name('Visibility');
        directionarLightsFolder.add(directionLightCameraHelper, 'visible').name('Helper');
        directionarLightsFolder.add(directionalLight, 'intensity').min(0).max(5).step(0.01).name('Intensity');
        directionarLightsFolder.addColor(directionalLight, 'color').onChange((data) => {            
            let color = new Color(data.r/255, data.g/255, data.b/255);
            directionalLight.color = color;
        });
        directionarLightsFolder.add(directionalLight.position, 'x').min(-10).max(10).step(0.01).name('X');
        directionarLightsFolder.add(directionalLight.position, 'y').min(-10).max(10).step(0.01).name('Y');
        directionarLightsFolder.add(directionalLight.position, 'z').min(-10).max(10).step(0.01).name('Z');

        const leftLightsFolder = lightsFolder.addFolder('Left Light')
        leftLightsFolder.add(leftLight, 'visible').name('Visibility');
        leftLightsFolder.add(leftPointLightHelper, 'visible').name('Helper');
        leftLightsFolder.add(leftLight, 'intensity').min(0).max(5).step(0.01).name('Intensity');
        leftLightsFolder.addColor(leftLight, 'color').onChange((data) => {            
            let color = new Color(data.r/255, data.g/255, data.b/255);
            leftLight.color = color;
        });
        leftLightsFolder.add(leftLight.position, 'x').min(-10).max(10).step(0.01).name('X');
        leftLightsFolder.add(leftLight.position, 'y').min(-10).max(10).step(0.01).name('Y');
        leftLightsFolder.add(leftLight.position, 'z').min(-10).max(10).step(0.01).name('Z');

        const rightLightsFolder = lightsFolder.addFolder('Right Light')
        rightLightsFolder.add(rightLight, 'visible').name('Visibility');
        rightLightsFolder.add(rightPointLightHelper, 'visible').name('Helper');
        rightLightsFolder.add(rightLight, 'intensity').min(0).max(5).step(0.01).name('Intensity');
        rightLightsFolder.addColor(rightLight, 'color').onChange((data) => {            
            let color = new Color(data.r/255, data.g/255, data.b/255);
            rightLight.color = color;
        });
        rightLightsFolder.add(rightLight.position, 'x').min(-10).max(10).step(0.01).name('X');
        rightLightsFolder.add(rightLight.position, 'y').min(-10).max(10).step(0.01).name('Y');
        rightLightsFolder.add(rightLight.position, 'z').min(-10).max(10).step(0.01).name('Z');
        
        const spotLightsFolder = lightsFolder.addFolder('Spot Light')
        spotLightsFolder.add(spotLight, 'visible').name('Visibility');
        spotLightsFolder.add(spotLightCameraHelper, 'visible').name('Helper');
        spotLightsFolder.add(spotLight, 'intensity').min(0).max(5).step(0.01).name('Intensity');
        spotLightsFolder.addColor(spotLight, 'color').onChange((data) => {            
            let color = new Color(data.r/255, data.g/255, data.b/255);
            spotLight.color = color;
        });
        spotLightsFolder.add(spotLight.position, 'x').min(-10).max(10).step(0.01).name('X');
        spotLightsFolder.add(spotLight.position, 'y').min(-10).max(10).step(0.01).name('Y');
        spotLightsFolder.add(spotLight.position, 'z').min(-10).max(10).step(0.01).name('Z');


        /** 
         * Scene objects
         */
        const textureLoader = new TextureLoader(this.loadingManager);
        //const matcapTextexture = textureLoader.load('/assets/textures/matcaps/1.png');

        const cube = createCube(projectState.active);
        const sphere = createSphere();
        const text = createText(projectState.active, this.scene, this.camera);

        const plane = createPlane();
        //plane.material.roughness = 0.7
        this.gui.add(plane.material, 'metalness').min(0).max(1).step(0.001)
        this.gui.add(plane.material, 'roughness').min(0).max(1).step(0.001)

        //look cameras to cube position
        leftLight.lookAt(cube.position);
        rightLight.lookAt(cube.position);

        this.scene.add(plane, cube, sphere)


        this.loop.updatables.push(cube);


        const resizer = new Resizer(container, this.camera, this.renderer);
        // resizer.onResize = () => {
        //     this.render();
        // };
            
        projectState.addListener((projects: Project[]) => {
                
            console.log('setColor', projectState.active);
            cube.material.color = new Color(projectState.active.color);

            if (projectState.active.desing) {
                console.log('setDesign', projectState.active.desing);
                
                let customTexture = textureLoader.load(projectState.active.desing)

                console.log('customTexture', customTexture);
                
                cube.updateTexture(customTexture)
            }
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