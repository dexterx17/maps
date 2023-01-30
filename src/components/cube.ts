import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from 'three';

function createCube() {
    // create a geometry
    const geometry = new BoxGeometry(2, 2, 2);

    // create a default (white) Basic material
    const material = new MeshStandardMaterial();


    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    
    let x = 0, y = 0, z = 0;
    
    //cube.rotation.set(6, 6, 6);

    setInterval(function(){
        //if (x < 10) {
        x +=1;
        y +=1;
        z +=1;
            cube.rotation.set(x, y, z);
        // } else {
        //     cube.rotation.set(x -= 1, y -= 1, z);
        // }
        console.log(x, y, z);
    }, 500);

    return cube;
}

export { createCube };