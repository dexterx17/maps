import { PerspectiveCamera } from 'three';

function createCamera() {
    const camera = new PerspectiveCamera(
        35, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane || means objects closer to the camera than ten centimeters will not be visible.
        100, // far clipping plane || means we can see for a distance of one hundred meters.
    );

    // move the camera back so we can view the scene
    camera.position.set(0, 5, 25);

    return camera;
}

export { createCamera };