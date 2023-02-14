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
        
        // create a rect object
        var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

        var img = document.createElement('img');
        img.src = deleteIcon;

        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon,
            cornerSize: 24
        });

        function deleteObject(eventData, transform) {
            var target = transform.target;
            var canvas = target.canvas;
            canvas.remove(target);
            canvas.requestRenderAll();
        }

        function renderIcon(ctx, left, top, styleOverride, fabricObject) {
            var size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(img, -size / 2, -size / 2, size, size);
            ctx.restore();
        }

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