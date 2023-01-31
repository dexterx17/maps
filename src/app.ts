import { World } from './world';
import { ToolbarOptions } from './ui/toolbarOption';

function main() {
  console.log('main');
    // Get a reference to the container element
    const container = document.querySelector('#scene-container') as HTMLElement;
  
    // Get a reference to the init btn
    //const btnIniciar = document.getElementById('btn-iniciar')! as HTMLElement;

//    btnIniciar.addEventListener('click', () => {
        // 1. Create an instance of the World app
        const world = new World(container);
      
        // We can access member variables from the instance
        // console.log(world.camera);
        // console.log(world.renderer);
        // console.log(world.scene);

        // produce a single frame (render on demand)
        //world.render();

        // start the loop (produce a stream of frames)
    world.start();
    

    new ToolbarOptions();

        //btnIniciar.style.display = 'none';
//    })
}

main();