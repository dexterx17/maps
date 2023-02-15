import { PCFSoftShadowMap, WebGLRenderer } from 'three';

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // turn on the physically correct lighting model
    //renderer.physicallyCorrectLights = true;

    // enable shadows
    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = PCFSoftShadowMap;
    
    return renderer;
}

export { createRenderer };