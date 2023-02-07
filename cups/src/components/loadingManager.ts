import { LoadingManager } from "three";

function createLoadingManager() {
    const loadingManager = new LoadingManager();

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
    
    return loadingManager;
}

export { createLoadingManager };