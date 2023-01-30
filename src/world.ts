import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createLights } from './components/lights';
import { createCube } from './components/cube';
import { createSphere } from './components/sphere';

import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/resizer';


class World{
    
    camera: THREE.PerspectiveCamera = null;
    scene: THREE.Scene = null;
    renderer: THREE.Renderer = null;

    constructor(container: HTMLElement){
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        container.append(this.renderer.domElement)

        const cube = createCube();
        const sphere = createSphere();

        const light = createLights();


        this.scene.add(cube, light);

        this.scene.add(sphere);


        const resizer = new Resizer(container, this.camera, this.renderer);
    }

    render(){
        this.renderer.render(this.scene, this.camera);
    }
}

export { World };