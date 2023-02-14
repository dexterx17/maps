import Cmp from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ColorItem } from './color-item';
import { fabric } from 'fabric';

// ProjectDesign Class
export class ProjectDesign extends Cmp<HTMLDivElement, HTMLFormElement> {
    textoInputElement: HTMLInputElement;
    btnSeleccionarOpcion: HTMLElement;
    btnFinalizarElement: HTMLButtonElement;
    btnCancelarElement: HTMLButtonElement;
    btnImageOption: HTMLElement;
    inputImage: HTMLInputElement;
    availableColors: string[] = [];
    finalImage: string;
    canvas: fabric.Canvas;

    //peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-design', 'modal', true, 'user-design');

        this.btnFinalizarElement = this.element.querySelector(
            '#finalizar-design'
        ) as HTMLButtonElement;

        this.btnCancelarElement = this.element.querySelector(
            '#cancelar-design'
        ) as HTMLButtonElement;

        this.btnImageOption = this.element.querySelector(
            '#btn-design-image'
        ) as HTMLElement;

        this.inputImage = this.element.querySelector(
            '#input-upload-file'
        ) as HTMLInputElement;

        this.canvas = new fabric.Canvas('canvas-design', {
            //backgroundColor: 'rgb(255,0,0)',
            selectionColor: 'blue',
            selectionLineWidth: 2,
            width: 756,
            height: 359
        });

        this.fetchModels();
        this.configure();
    }

    configure() {
        //        this.renderColors();

        this.btnFinalizarElement.addEventListener('click', this.okHandler);
        this.btnCancelarElement.addEventListener('click', this.cancelHandler);
        this.btnImageOption.addEventListener('click', this.openFileUploader);
        this.inputImage.addEventListener('change', this.handlePickedImage);

        var text = new fabric.Text("Área de impresión de tu taza", {
            fontSize: 20
        });
        
        this.canvas.add(text);
    }

    renderContent() { }


    private fetchModels() {
        let parent = this;
    }

    private renderColors() {

    }

    @autobind
    private openFileUploader() {
        this.inputImage.click();
    }

    @autobind
    private handlePickedImage(evt) {
        console.log('files', evt)
        let files = evt.target.files;
            for (let i = 0; i < files.length; i++) {
                const img = document.createElement("img");
                img.src = URL.createObjectURL(files[i]);

                //img.height = 60;
                img.onload = () => {
                    //URL.revokeObjectURL(img.src);
                    var imgInstance = new fabric.Image(img, {
                        left: 10,
                        top: 10,
                        opacity: 0.85
                    });
                    imgInstance.on('selected', function () {
                        console.log('selected a image');
                    });
                    this.canvas.add(imgInstance);
                }

                // var rect = new fabric.Rect({
                //     left: 100,
                //     top: 100,
                //     fill: 'yellow',
                //     width: 20,
                //     height: 20,
                //     angle: 45
                // });

                this.finalImage = img.src;
            
        }
    }
    
    @autobind
    private okHandler() {
        projectState.updateTexture(this.finalImage);

        this.hostElement.innerHTML = '';
        this.hostElement.style.display = 'none';
    }

    @autobind
    private cancelHandler() {
        this.hostElement.innerHTML = '';
        this.hostElement.style.display = 'none';
    }
}