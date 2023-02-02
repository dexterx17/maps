import { BoxGeometry, Color, Mesh, MeshStandardMaterial, MathUtils } from 'three';

function createCube() {
    // create a geometry
    const geometry = new BoxGeometry(2, 2, 2);

    // create a default (white) Basic material
    const material = new MeshStandardMaterial();


    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    const radiansPerSecond = MathUtils.degToRad(30);
    
    // this method will be called once per frame
    cube.tick = (delta) => {
            // increase the cube's rotation each frame
            cube.rotation.z += radiansPerSecond * delta;
            cube.rotation.x += radiansPerSecond * delta;
            cube.rotation.y += radiansPerSecond * delta;
    };

    return cube;
}

export { createCube };