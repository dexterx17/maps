import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createCube } from './components/cube';

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

        this.scene.add(cube);

        const resizer = new Resizer(container, this.camera, this.renderer);
    }

    render(){
        this.renderer.render(this.scene, this.camera);
    }
}

export { World };