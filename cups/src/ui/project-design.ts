import Cmp from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ColorItem } from './color-item';

// ProjectDesign Class
export class ProjectDesign extends Cmp<HTMLDivElement, HTMLFormElement> {
    textoInputElement: HTMLInputElement;
    btnSeleccionarOpcion: HTMLElement;
    btnCancelarElement: HTMLButtonElement;
    availableColors: string[] = [];

    //peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-design', 'modal', true, 'user-design');
        
        this.btnCancelarElement = this.element.querySelector(
            '#cancelar-design'
        ) as HTMLButtonElement;

        this.fetchModels();
        this.configure();
    }

    configure() {
//        this.renderColors();
        this.btnCancelarElement.addEventListener('click', this.cancelHandler);        
    }

    renderContent() { }


    private fetchModels() {
        let parent = this;
    }

    private renderColors() {
        
    }

    @autobind
    private cancelHandler() {
        this.hostElement.innerHTML = '';
        this.hostElement.style.display = 'none';
    }
}