import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const starsTexture = textureLoader.load('/textures/particles/2.png')

/**
 * Particles
 */
// Sphere Geometry
//const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);

// Random Matrix Geometry
const count = 50000
const positionsArray = new Float32Array( count * 3 );
const colors = new Float32Array( count * 3);
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random()
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionsArray,3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors,3));

console.log(particlesGeometry.attributes.position.array)


// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    //color: '#ff88cc',
    alphaMap: starsTexture,
    transparent: true,
    //alphaTest: 0.001
    //depthTest: false
    depthWrite : false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
});

//Cube
const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshBasicMaterial()
);
scene.add(cube);

// // Figure from triangles
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
//         color: 'blue',
//         wireframe: true
//     });
//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);
// }


//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update particles 
    //particles.rotation.y = elapsedTime * 0.2
    //particles.rotation.x = elapsedTime * 0.02

    for (let index = 0; index < count; index++) {
        const i3 = index * 3;
        
        const x = particlesGeometry.attributes.position.array[i3];
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime+x);
        particlesGeometry.attributes.position.needsUpdate = true;
        
    }
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()