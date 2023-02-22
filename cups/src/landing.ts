import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    CircleGeometry,
    Clock,
    Color,
    CylinderGeometry,
    DirectionalLight,
    DoubleSide,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshMatcapMaterial,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Points,
    PointsMaterial,
    Scene,
    TextureLoader,
    Vector2,
    WebGLRenderer
} from "three";
import * as dat from "dat.gui";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
//import gsap from 'gsap';

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        tazaMaterial.color.set(parameters.materialColor)
        //particlesMaterial.color.set(parameters.materialColor)
    })

/**
 * Textures
 */
const fontLoader = new FontLoader();
const textureLoader = new TextureLoader();
const particleTexture = textureLoader.load('assets/textures/particles/4.png');
const matcapTextexture = textureLoader.load('assets/textures/matcaps/8.png');
const tazaTexture = textureLoader.load('assets/textures/minecraft.png');

/**
* Base
*/
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new Scene()

/**
 * Objects
 */
const w = 8.3;
const h = 9.7;
const objectsDistance = 5.0;


/**
 * Taza Header
 */
// Taza Material
const tazaMaterial = new MeshStandardMaterial({
    color: parameters.materialColor,
    map: tazaTexture
});

// Taza object
const tazaHeader = new Mesh(
    new CylinderGeometry(2, 2, 4),
    tazaMaterial
)
tazaHeader.position.x = 3
scene.add(tazaHeader);

/** 
 * Modelos de Tazas
 */
const modelosTazas = new Group();
modelosTazas.position.x = -5
modelosTazas.position.z = -3
scene.add(modelosTazas);

const modelo1 = new Mesh(
    new CylinderGeometry(2, 2, 4),
    tazaMaterial
);
modelo1.position.y = -2
modelo1.position.x = 4.5

const tazaModelo2 = new MeshBasicMaterial({
    color: 'red',
});
const modelo2 = new Mesh(
    new CylinderGeometry(2, 2, 4),
    tazaModelo2
);
modelo2.position.y = -2
const modelo3 = new Mesh(
    new CylinderGeometry(2, 2, 4),
    tazaMaterial
);
modelo3.position.x = -4.5
modelo3.position.y = -2
modelosTazas.add(modelo1, modelo2, modelo3);

/**
 * Colors
 */
const coloresGroup = new Group();
scene.add(coloresGroup);

const colors = [
    new Color('red'),
    new Color('green'),
    new Color('blue'),
    new Color('yellow'),
    new Color('orange'),
];

for (let index = 0; index < colors.length; index++) {
    const c = colors[index];

    for (const c of colors) {
}
    const color = new MeshBasicMaterial({
        color: c,
        visible: true,
        side: DoubleSide
    });
    
    const colorObject = new Mesh(
        new CircleGeometry(1, 64, 64),
        color
    );
    colorObject.position.x = index * 2
    coloresGroup.add(colorObject);

}

/**
 * Plane 
 */
const planeGroup = new Group();
scene.add(planeGroup);

const plane = new Mesh(
    new PlaneGeometry(12, 6, 32, 32),
    new MeshBasicMaterial({
        color: 'white',
        side: DoubleSide
    })
);
planeGroup.add(plane);

fontLoader.load(
    'assets/fonts/helvetiker_regular.typeface.json',
    (font) => {
        console.log('font', font)
        const textGeometry = new TextGeometry(
            'Your design here !!',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
        
                bevelSegments: 4
            }
        )
        textGeometry.center();

        const textMaterial = new MeshMatcapMaterial({
            matcap: matcapTextexture
        });

        const text = new Mesh(textGeometry, textMaterial);
        planeGroup.add(text);

    });



/**
 * Poisition sections
 */
tazaHeader.position.y = - objectsDistance * 0;
modelosTazas.position.y = - objectsDistance * 1;
coloresGroup.position.y = - objectsDistance * 2.5;
planeGroup.position.y = - objectsDistance * 3.5;

const sectionMeshes = [
    tazaHeader,
    modelosTazas,
    coloresGroup,
    planeGroup
];

/**
 * Particles
 */
//Gemotry
const countParticles = 200
const positions = new Float32Array(countParticles * 3)
const colorsParticles = new Float32Array(countParticles * 3)

for (let index = 0; index < countParticles; index++) {
    positions[index * 3 + 0] = (Math.random() - 0.5) * 10;
    positions[index * 3 + 1] = (objectsDistance * 0.5) - Math.random() * objectsDistance * 5;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 10;

    let color = new Color('#ff0000');

    colorsParticles[index * 3 + 0] = color.r;
    colorsParticles[index * 3 + 1] = color.g;
    colorsParticles[index * 3 + 2] = color.b;
}

const particlesGeometry = new BufferGeometry()
particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));
//particlesGeometry.setAttribute('color',new BufferAttribute(colors, 3));

const particlesMaterial = new PointsMaterial({
    color: parameters.materialColor,

    size: 0.1,
    sizeAttenuation: true,

    alphaMap: particleTexture,
    transparent: true,

    depthWrite: false,
    blending: AdditiveBlending,
    // vertexColors: true
})

const particles = new Points(particlesGeometry, particlesMaterial);
scene.add(particles);


/**
 * Lights
 */
const directionalLight = new DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}); 

/**
 * Cursor
 */
const cursor = new Vector2();

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = e.clientY / sizes.height - 0.5;
});

/**
 * Camera
*/
const cameraGroup = new Group();
scene.add(cameraGroup);
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Scroll
 */
let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});
/**
 * Renderer
 */
const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

//Make Canvas transparent
//renderer.setClearAlpha(0) 
//Make canvas fullscreen
renderer.setSize(sizes.width, sizes.height)
//Define pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new Clock()
let previousTime = 0;

const tick = () => {

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    //Animate camera
    camera.position.y = -scrollY / sizes.height * objectsDistance;
    const parallaxX = cursor.x * 0.5;
    const parallaxY = cursor.y * 0.5;

    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime * 5;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime * 5;



    //Animate objects
    tazaHeader.rotation.y += 0.05 * deltaTime;

    modelosTazas.rotation.y += 0.05 * deltaTime;
    for (let i = 0; i < modelosTazas.children.length; i++){
        modelosTazas.children[i].rotation.y += 0.05 * deltaTime;
    }

    for (let i = 0; i < coloresGroup.children.length; i++) {
        coloresGroup.children[i].rotation.y += 0.05 * deltaTime;
        coloresGroup.children[i].rotation.x += 0.05 * deltaTime;
    }
    
    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();