import {
    BoxGeometry,
    Color,
    Mesh,
    MeshStandardMaterial,
    MathUtils,
    MeshBasicMaterial,
    TextureLoader,
    Texture
} from 'three';

function createCube() {
    // create a geometry
    const geometry = new BoxGeometry(2, 2, 2);

    const textureLoader = new TextureLoader();
    //const texture = textureLoader.load('/assets/textures/uv-test-bw.png');
    const texture = new Texture();

    // create a default (white) Basic material
    //const material = new MeshStandardMaterial();
    const material = new MeshBasicMaterial({
        map: texture,
        color: 0xff0000
    });

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    
    cube.position.x = -1

    const radiansPerSecond = MathUtils.degToRad(15);
    
    // this method will be called once per frame
    cube.tick = (delta) => {
            // increase the cube's rotation each frame
            //cube.rotation.z += radiansPerSecond * delta;
            //cube.rotation.x += radiansPerSecond * delta;
            cube.rotation.y += radiansPerSecond * delta;
    };

    return cube;
}

export { createCube };