import { SphereGeometry, Mesh, MeshStandardMaterial, Color } from "three";

function createSphere() {
    // create a geometry
    const geometry = new SphereGeometry(1, 32, 16);

    // create a default (white) Basic material
    //const material = new MeshBasicMaterial();
    // Switch the old "basic" material to
    // a physically correct "standard" material
    const material = new MeshStandardMaterial({
        color: "purple"
    });

    //material.color = new Color("blue");

    // create a Mesh containing the geometry and material
    const sphere = new Mesh(geometry, material);

    sphere.position.set(2.1, 0, 1);
    return sphere;
}

export { createSphere };