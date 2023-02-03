import Cmp from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ColorItem } from './color-item';

// ProjectColor Class
export class ProjectColor extends Cmp<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    btnSeleccionarModelo: HTMLElement;
    availableColors: string[] = [];

    //peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-color', 'modal', true, 'user-color');

        this.fetchModels();
        this.configure();
    }

    configure() {
        this.renderColors();
    }

    renderContent() { }

    
    private fetchModels(){
        let parent = this;
        this.availableColors =  [
            '#ffffff',
            '#000000',
            '#ff0000',
            '#00ff00',
            '#0000ff',
        ];
    }

    private renderColors() {
        console.log('this.availableColors',this.availableColors)

        for (const colorItem of this.availableColors) {
            new ColorItem(this.element.querySelector('#colors-container')!.id, colorItem);
        }
    }
}