import './style.css';

import * as THREE from 'three';
import gsap from 'gsap';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//import imageSource from './color.jpg';
//dconsole.log(imageSource);

/**
 * Texture
 */
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//     texture.needsUpdate = true;
//     console.log('image loading', texture);
// }
// image.src = 'textures/door/color.jpg';
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//     console.log('on Start');
// };

// loadingManager.onLoad = () => {
//     console.log('onLoad');
// };

// loadingManager.onProgress = (evt) => {
//     console.log('onProgress', evt);
// };

// loadingManager.onError = () => {
//     console.log('onError');
// };

const textureLoader = new THREE.TextureLoader(loadingManager);
const matcapTextexture = textureLoader.load('/textures/matcaps/1.png');
const colorTexture = textureLoader.load('/textures/minecraft.png');
//const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png');
//const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png');
const doorTexture = textureLoader.load('/textures/door/color.jpg');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
// colorTexture.repeat.set(2, 3)
// //colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI / 4
// colorTexture.center.set(0.5, 0.5);

//colorTexture.generateMipmaps = false
//colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

// Debug
const gui = new dat.GUI({
    closed: true,
    //width: 400
});

//gui.hide(); //H

const parameters = {
    color: 0x00ff00,
    spin: () => {
        console.log('spin');
        gsap.to(mesh.rotation, { 
            duration:1,
            y: mesh.rotation.y + Math.PI * 2
        })
    }
};

let canvas = document.querySelector('.webgl');

//console.log(OrbitControls);
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
//const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 3, 3, 3);
console.log(geometry.attributes.uv);
//const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
//const geometry = new THREE.ConeBufferGeometry(1, 1, 32);
//const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100);

// const material = new THREE.MeshBasicMaterial({
//     color: parameters.color,
//     wireframe: true
// });
// const material = new THREE.MeshBasicMaterial({
//     map: colorTexture,
//     //wireframe: true
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// gui.add(mesh.position, 'x', -3, 3, 0.1);
// gui.add(mesh.position, 'z', -3, 3, 0.1);
// gui.add(mesh.position, 'y')
//     .min(-3)
//     .max(3)
//     .step(0.01)
//     .name('elevation');

// gui.add(mesh, 'visible');
// gui.add(material, 'wireframe');

// gui
//     .addColor(parameters,'color')
//     .onChange( () => {
//         material.color.set(parameters.color);
//     });

// gui.add(parameters, 'spin');

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
material.transparent = true;
material.alphaMap = alphaTexture
//material.side = THREE.DoubleSide

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,16,16),
    material
);
sphere.position.x = -1.5;
const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1),
    material
);

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
    material
);
torus.position.x = 1.5;
scene.add(sphere, plane, torus)
// const count = 5000
// const positionsArray = new Float32Array( count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//     positionsArray[i] = (Math.random() - 0.5) * 4;
// }

// const positionAttribute = new THREE.BufferAttribute(positionsArray,3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', positionAttribute);
// const material = new THREE.MeshBasicMaterial({
//     color: 'red',
//     wireframe: true
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// Figure from triangles
// for (let i = 0; i < 50; i++) {
//     const points = [];

//     for (let j = 0; j < 3; j++) {
//         const vertex = new THREE.Vector3(
//             (Math.random() - 0.5) *4,
//             (Math.random() - 0.5) *4,
//             (Math.random() - 0.5) *4
//         );
//         points.push(vertex);
//     }    
    
//     const geometry = new THREE.BufferGeometry()
//     .setFromPoints( points );
//     const material = new THREE.MeshBasicMaterial({
//         color: 'red',
//         wireframe: true
//     });
//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);
// }

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
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    console.log('resized');
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update aspce caemra
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()

    //update renderer 
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})

window.addEventListener('dblclick',() => {
    
    const fullscreenElement = document.fullscreenElement || document.webkitFullscriptElement;

    if( !fullscreenElement){
        console.log('go fullscreen');
        if(canvas?.requestFullscreen){
            canvas.requestFullscreen();
        }else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen();
        }
    }else{
        console.log('leave screen');
        if(document.exitFullscreen){
            document.exitFullscreen();
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
    }
});

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
//console.log(camera.position.length())
//camera.lookAt(mesh.position)

// Controls
const controls = new OrbitControls(camera, canvas);
//controls.enabled = false;
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

    controls.update();
    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick()