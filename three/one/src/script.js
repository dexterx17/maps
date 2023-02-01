import './style.css';

import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();


// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Camera
const fov = 75; //degrees
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);


// Renderer
let canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

console.log(scene);