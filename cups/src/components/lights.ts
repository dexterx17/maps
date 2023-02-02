import { DirectionalLight, PointLight, SpotLight, RectAreaLight } from "three";

function createLights() {
    const directionalLight = new DirectionalLight('white', 8);
    directionalLight.position.set(10, 10, 10);


    const pointLight = new PointLight('white', 1,100);
    pointLight.position.set(10, 10, 10);

    const spotLight = new SpotLight('white');
    spotLight.position.set(10, 10, 10);

    const width = 20;
    const height = 20;
    const intensity = 1;
    const rectLight = new RectAreaLight(0xffffff, intensity, width, height);
    rectLight.position.set(10, 10, 10);
    rectLight.lookAt(0, 0, 0);
    
    return rectLight;
    return spotLight;
    return pointLight;
    return directionalLight;
}

export { createLights };