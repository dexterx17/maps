import { BoxGeometry, CylinderGeometry, Color, Mesh, MeshStandardMaterial, MathUtils, Texture, TextureLoader, MeshBasicMaterial } from 'three';
import { Project } from '../models/project';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

function createText(project: Project, scene: THREE.Scene, camera: THREE.Camera) {

    const fontLoader = new FontLoader();
    fontLoader.load(
        '/assets/fonts/helvetiker_regular.typeface.json',
        (font) => {
            console.log('project', project);

            console.log('font', font)
            const textGeometry = new TextGeometry(
                project.title,
                {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffest: 0,
                    bevelSegments: 4
                }
            )

            //  textGeometry.translate(
            //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
            //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
            //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
            //  )
            textGeometry.center()
            textGeometry.computeBoundingBox();
            console.log('bounding', textGeometry.boundingBox)

            const textMaterial = new MeshBasicMaterial();
            //const textMaterial = new THREE.MeshMatcapMaterial({
              //  matcap: matcapTextexture
           // });
            //textMaterial.wireframe = true;

            const text = new Mesh(textGeometry, textMaterial);

            text.position.y = 3;

            text.lookAt(camera.position)

            scene.add(text)
        })

}

export { createText }