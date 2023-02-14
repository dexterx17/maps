import { DirectionalLight, PointLight, SpotLight, RectAreaLight } from "three";

function createLights() {
    const directionalLight = new DirectionalLight('white', 10);
    directionalLight.position.set(10, 10, 10);


    const pointLight = new PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 3, 4);

    const spotLight = new SpotLight('white');
    spotLight.position.set(10, 10, 10);

    const width = 20;
    const height = 20;
    const intensity = 1;
    const rectLight = new RectAreaLight(0xffffff, intensity, width, height);
    rectLight.position.set(10, 10, 10);
    rectLight.lookAt(0, 0, 0);
    
    return pointLight;
    return directionalLight;
    return rectLight;
    return spotLight;
}

export { createLights };