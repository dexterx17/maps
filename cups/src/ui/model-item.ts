import { Modelo } from '../models/project';
import Component from './base-component';
import { projectState } from '../state/project-state';
import { autobind } from '../decorators/autobind';

// ModeloItem Class
export class ModeloItem extends Component<HTMLUListElement, HTMLLIElement>{

    private modelo: Modelo;

    btnsSeleccionarModelo: NodeListOf<HTMLButtonElement>;

    // get persons() {
    //     if (this.modelo.people === 1) {
    //         return '1 person';
    //     } else {
    //         return `${this.modelo.people} persons`;
    //     }
    // }

    constructor(hostId: string, modelo: Modelo) {
        super('single-modelo', hostId, false, modelo.id.toString());
        console.log('modelo',modelo);
        this.modelo = modelo;
        this.btnsSeleccionarModelo = this.element.querySelectorAll(
            'button'
        ) as NodeListOf<HTMLButtonElement>;

        this.configure();
        this.renderContent();
    }

    configure() {
        this.btnsSeleccionarModelo.forEach(btn => {
            btn.addEventListener('click', this.pickModel);
        })
    }

    renderContent() {
        this.element.querySelector('img')!.setAttribute('src',this.modelo.img);
        this.element.querySelector('img')!.setAttribute('alt',this.modelo.name);
        this.element.querySelector('h2')!.textContent = this.modelo.name;
        this.element.querySelector('p.materials')!.textContent = this.modelo.materials;
        this.element.querySelector('span.price')!.textContent = `$ ${this.modelo.price}`;

    }

    @autobind
    private pickModel(){
        console.log('pickModel',this.modelo);
        projectState.updateModel(this.modelo);
    }
}
