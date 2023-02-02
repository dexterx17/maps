import './style.css';

import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Objects
const group = new THREE.Group();
scene.add(group);

group.rotation.y = 1;

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'green'})
);
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'yellow'})
);
cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'blue'})
);
cube3.position.x = 2;
group.add(cube3);

// // Red cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 'red' });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // Position
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;
// mesh.position.set( 0.7, - 0.6, 1);

// // Scale
// // mesh.scale.x = 1;
// // mesh.scale.y = 0.5;
// // mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// // Rotation
// mesh.rotation.reorder('YXZ');
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

// Axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

//mesh.position.normalize();
//console.log(mesh.position.length())
// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Camera
const fov = 75; //degrees
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
//camera.lookAt(mesh.position)

// Distance to a camera
//console.log(mesh.position.distanceTo(camera.position));

// Renderer
let canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

console.log(scene);