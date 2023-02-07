import * as dat from 'dat.gui';

function createDebugger() {
    // Debug
    const gui = new dat.GUI({
        closed: true,
        //width: 400
    });

    return gui;
}

export { createDebugger };