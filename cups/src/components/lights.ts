import { DirectionalLight, PointLight, SpotLight, RectAreaLight } from "three";

function createPointLight() : PointLight {
    const pointLight = new PointLight(0xffffff, 0.3);
    pointLight.castShadow = true;
    return pointLight;
}

function createDirectionalLight(): DirectionalLight {
    const directionalLight = new DirectionalLight(0xffffff, 0.3);
    //directionalLight.position.set(10, 10, 10);
    
    directionalLight.position.set(0, 3, 5);
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 15;

    directionalLight.shadow.camera.top = 3;
    directionalLight.shadow.camera.right = 3;
    directionalLight.shadow.camera.bottom = -3;
    directionalLight.shadow.camera.left = -3;

    return directionalLight;
}


function createSpotLight(): SpotLight {
    const spotLight = new SpotLight(0xffFFFF, 2, 20, Math.PI * 0.3);
    spotLight.castShadow = true;
    spotLight.position.set(0, 5, -5);
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    //spotLight.shadow.camera.fov = 30
    spotLight.shadow.camera.near = 1
    spotLight.shadow.camera.far = 16

    return spotLight;
}

function createRectAreaLight(): RectAreaLight {
    const width = 20;
    const height = 20;
    const intensity = 1;
    const rectLight = new RectAreaLight(0xffffff, intensity, width, height);
    rectLight.position.set(10, 10, 10);
    rectLight.lookAt(0, 0, 0);

     return rectLight;
}

export {
    createPointLight,
    createDirectionalLight,
    createSpotLight,
    createRectAreaLight
};