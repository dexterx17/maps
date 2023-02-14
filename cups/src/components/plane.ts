import { PlaneGeometry, CylinderGeometry, Color, Mesh, MeshBasicMaterial, MathUtils, Texture, TextureLoader } from 'three';

function createPlane() {
    // create a geometry
    const geometry = new PlaneGeometry(20, 20, 8, 8);
    //const geometry = new CylinderGeometry(2, 2, 4);
    //geometry.setAttribute('openEnded',true)

    // create a default (white) Basic material
    const material = new MeshBasicMaterial({
        color: 0xffffff
    });

    // default texture
    const textureLoader = new TextureLoader();
    const alphaTexture = textureLoader.load('/assets/textures/door/alpha.jpg');
    //const matcapTextexture = textureLoader.load('/textures/matcaps/1.png');

    alphaTexture.rotation = Math.PI / 4
    alphaTexture.center.set(0.5, 0.5);
    material.transparent = true;
    //material.map = matcapTextexture;
    //material.alphaMap = alphaTexture;

    // create a Mesh containing the geometry and material
    const plane = new Mesh(geometry, material);
    
    
    plane.rotation.x = - Math.PI * 0.5
    plane.position.y = - 2

    const radiansPerSecond = MathUtils.degToRad(15);
    
    // this method will be called once per frame
    plane.tick = (delta) => {
            // increase the plane's rotation each frame
            //plane.rotation.z += radiansPerSecond * delta;
            //plane.rotation.x += radiansPerSecond * delta;
        //plane.rotation.y += radiansPerSecond * delta;

    };

    return plane;
}

export { createPlane };