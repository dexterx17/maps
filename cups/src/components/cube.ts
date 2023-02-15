import { BoxGeometry, CylinderGeometry, Color, Mesh, MeshStandardMaterial, MathUtils, Texture, TextureLoader } from 'three';
import { Project } from '../models/project';

function createCube(project: Project) {
    // create a geometry
    const geometry = new CylinderGeometry(2, 2, 4);
    //const geometry = new CylinderGeometry(2, 2, 4);
    //geometry.setAttribute('openEnded',true)

    // create a default (white) Basic material
    const material = new MeshStandardMaterial();

    // default texture
    const textureLoader = new TextureLoader();
    const alphaTexture = textureLoader.load('/assets/textures/door/alpha.jpg');
    const matcapTextexture = textureLoader.load('/assets/textures/matcaps/1.png');
    //const matcapTextexture = textureLoader.load('/textures/matcaps/1.png');

    alphaTexture.rotation = Math.PI / 4
    alphaTexture.center.set(0.5, 0.5);
    material.transparent = true;
    //material.map = matcapTextexture;
    //material.alphaMap = alphaTexture;

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    
    //cube.position.x = -1
    cube.castShadow = true;

    const radiansPerSecond = MathUtils.degToRad(15);
    
    // this method will be called once per frame
    cube.tick = (delta) => {
            // increase the cube's rotation each frame
            //cube.rotation.z += radiansPerSecond * delta;
            //cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;

    };

    cube.updateTexture = (texture: Texture) => {
        console.log('update texture');
        
        material.map = texture;
        material.needsUpdate = true;
    }

    return cube;
}

export { createCube };