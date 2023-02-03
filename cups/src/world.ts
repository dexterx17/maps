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

class World{
    
    camera: THREE.PerspectiveCamera = null;
    scene: THREE.Scene = null;
    renderer: THREE.Renderer = null;
    loop: Loop = null;
    controls: OrbitControls = null;
    projects: Project[] = [];

    constructor(container: HTMLElement){
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
}

export { World };