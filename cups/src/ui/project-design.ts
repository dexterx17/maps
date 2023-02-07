import Cmp from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ColorItem } from './color-item';

// ProjectDesign Class
export class ProjectDesign extends Cmp<HTMLDivElement, HTMLFormElement> {
    textoInputElement: HTMLInputElement;
    btnSeleccionarOpcion: HTMLElement;
    btnFinalizarElement: HTMLButtonElement;
    btnCancelarElement: HTMLButtonElement;
    btnImageOption: HTMLElement;
    inputImage: HTMLInputElement;
    availableColors: string[] = [];

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

        this.fetchModels();
        this.configure();
    }

    configure() {
        //        this.renderColors();
        this.btnFinalizarElement.addEventListener('click', this.okHandler);
        this.btnCancelarElement.addEventListener('click', this.cancelHandler);
        this.btnImageOption.addEventListener('click', this.openFileUploader);
        this.inputImage.addEventListener('change', this.handlePickedImage);
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
        let preview = this.element.querySelector('#fileList');
        let files = evt.target.files;
        if (!files.length) {
            preview.innerHTML = "<p>No files selected!</p>";
        } else {
            preview.innerHTML = "";
            const list = document.createElement("ul");
            preview.appendChild(list);
            for (let i = 0; i < files.length; i++) {
                const li = document.createElement("li");
                list.appendChild(li);

                const img = document.createElement("img");
                img.src = URL.createObjectURL(files[i]);
                img.height = 60;
                img.onload = () => {
                    //URL.revokeObjectURL(img.src);
                    var myCanvas = document.getElementById("canvas-design") as HTMLCanvasElement; // Creates a canvas object
                    var myContext = myCanvas.getContext("2d"); // Creates a contect object
                    myContext.drawImage(img, 0, 0); // Draws the image on canvas
                    //myCanvas.width = img.width; // Assigns image's width to canvas
                    //myCanvas.height = img.height; // Assigns image's height to canvas
                    //let imgData = myCanvas.toDataURL("image/jpeg",0.75); // Assigns image base64 string in jpeg format to a variable

                }

                //li.appendChild(img);
                const info = document.createElement("span");
                info.innerHTML = `${files[i].name}: ${files[i].size} bytes`;
                li.appendChild(info);
            }
        }
    }
    
    @autobind
    private okHandler() {
        //projectState.updateTexture('/assets/images/taza1.jpg');
        projectState.updateTexture('/assets/textures/minecraft.png');

        this.hostElement.innerHTML = '';
        this.hostElement.style.display = 'none';
    }

    @autobind
    private cancelHandler() {
        this.hostElement.innerHTML = '';
        this.hostElement.style.display = 'none';
    }
}