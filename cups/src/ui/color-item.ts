import Component from './base-component';
import { projectState } from '../state/project-state';

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
        this.btnsSeleccionarModelo.addEventListener('click', this.pickModel)
    }

    renderContent() {
        this.btnsSeleccionarModelo.style.backgroundColor = this.color;
        //this.element.querySelector('img')!.setAttribute('alt',this.modelo.name);
        
    }

    private pickModel(){
        projectState.updateColor(this.color);
    }
}
