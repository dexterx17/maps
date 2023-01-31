import { Modelo } from '../models/project';
import Component from './base-component';
import { autobind } from '../decorators/autobind.js';

// ModeloItem Class
export class ModeloItem extends Component<HTMLUListElement, HTMLLIElement>{

    private modelo: Modelo;

    // get persons() {
    //     if (this.modelo.people === 1) {
    //         return '1 person';
    //     } else {
    //         return `${this.modelo.people} persons`;
    //     }
    // }

    constructor(hostId: string, modelo: Modelo) {
        super('single-modelo', hostId, false, modelo.id);
        this.modelo = modelo;

        this.configure();
        this.renderContent();
    }

    configure() {
        //this.element.addEventListener('dragstart', this.dragStartHandler);
        //this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.modelo.title;
        //this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.modelo.description;

    }
}
