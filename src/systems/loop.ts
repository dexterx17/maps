import { Clock } from "three";

const clock = new Clock();

class Loop {
    
    camera: THREE.PerspectiveCamera = null;
    scene: THREE.Scene = null;
    renderer: THREE.Renderer = null;
    updatables = [];
    
    constructor(camera, scene, renderer: THREE.Renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            // tell every animated object to tick forward one frame
            this.tick();
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        // only call the getDelta function once per frame!
        const delta = clock.getDelta();
        for (const object of this.updatables) {
            object.tick(delta);
        }
        // console.log(
        //   `The last frame rendered in ${delta * 1000} milliseconds`,
        // );
    }
}

export { Loop };
