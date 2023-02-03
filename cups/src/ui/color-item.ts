import Component from './base-component';
import { projectState } from '../state/project-state';
import { autobind } from '../decorators/autobind';

// ColorItem Class
export class ColorItem extends Component<HTMLUListElement, HTMLLIElement>{

    private color: string;

    btnsSeleccionarModelo: HTMLElement;

    constructor(hostId: string, color: string) {
        super('single-color', hostId, false, color);
        this.color = color;
        this.btnsSeleccionarModelo = this.element.querySelector(
            '.color'
        ) as HTMLElement;

        this.configure();
        this.renderContent();
    }

    configure() {
        this.btnsSeleccionarModelo.addEventListener('click', this.pickColor)
    }

    renderContent() {
        this.btnsSeleccionarModelo.style.backgroundColor = this.color;
        //this.element.querySelector('img')!.setAttribute('alt',this.modelo.name);
        
    }

    @autobind
    private pickColor(){
        console.log('%ccolor-item.ts line:33 this.color', 'color: #007acc;', this.color);
        projectState.updateColor(this.color);
    }
}
