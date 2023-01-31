import Cmp from './base-component';
import { autobind as Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { Modelo } from '../models/project';
import { ModeloItem } from './model-item';

// ProjectModel Class
export class ProjectModel extends Cmp<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    btnSeleccionarModelo: HTMLElement;
    availableModels: Modelo[];

    //peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-model', 'modal', true, 'user-model');

        this.configure();
    }

    configure() {
        //this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() { }

    private renderModels() {

        for (const prjItem of this.availableModels) {
            new ModeloItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }
}
