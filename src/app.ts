import { World } from './world';

function main() {
  console.log('main');
    // Get a reference to the container element
    const container = document.querySelector('#scene-container') as HTMLElement;
  
    // Get a reference to the init btn
    const btnIniciar = document.getElementById('btn-iniciar')! as HTMLElement;

//    btnIniciar.addEventListener('click', () => {
        // 1. Create an instance of the World app
        const world = new World(container);
      
        // We can access member variables from the instance
        // console.log(world.camera);
        // console.log(world.renderer);
        // console.log(world.scene);
    
        // 2. Render the scene
        world.render();

        btnIniciar.style.display = 'none';
//    })
}

main();