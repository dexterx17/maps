import './style.css';

import * as THREE from 'three';
import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let canvas = document.querySelector('.webgl');

console.log(OrbitControls);
// Cursor
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (evt) => { 

    cursor.x = evt.clientX / sizes.width - 0.5;
    cursor.y = evt.clientY / sizes.height - 0.5;
    
})

// Scene
const scene = new THREE.Scene();

// Objects
// const group = new THREE.Group();
// scene.add(group);

// group.rotation.y = 1;

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({ color: 'green'})
// );
// group.add(cube1);

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({ color: 'yellow'})
// );
// cube2.position.x = -2;
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({ color: 'blue'})
// );
// cube3.position.x = 2;
// group.add(cube3);

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
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
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.01, 100);
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     100
// );
// camera.position.x = 3;
// camera.position.y = 3;
 camera.position.z = 3;
scene.add(camera);
console.log(camera.position.length())
//camera.lookAt(mesh.position)

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

// Distance to a camera
//console.log(mesh.position.distanceTo(camera.position));

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);

console.log(scene);

// gsap.to(group.position, {duration: 1,delay: 1,x: 2 });
// gsap.to(group.position, {duration: 1,delay: 2,x: 0 });

// Time
const clock = new THREE.Clock();
const tick = () => {

    // Time
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    //mesh.position.x += 0.01 * elapsedTime;
    //group.position.y += 0.01 * elapsedTime;
    //group.position.z += -0.01 * elapsedTime;
    
    // Rotate group in circle
    // group.position.y = Math.sin(elapsedTime);
    // group.position.x = Math.cos(elapsedTime);
    //mesh.position.x = Math.sin(elapsedTime);

    // Rotat cube
    //mesh.rotation.y = elapsedTime;
    
    // Rotate camera in circle
    // camera.position.y = Math.sin(elapsedTime);
    // camera.position.x = Math.cos(elapsedTime);
    
    // Update camera
    // camera.position.x = cursor.x * 3;
    // camera.position.y = -cursor.y * 3;

    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5;
    // camera.position.y = cursor.y * 5;
    
    // camera.lookAt(mesh.position);

    controls.update();
    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick()