import Cmp from './base-component';
import { autobind as Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

// ProjectResumen Class
export class ProjectResumen extends Cmp<HTMLDivElement, HTMLFormElement> {
    btnCancelarElement: HTMLButtonElement;

    constructor() {
        super('project-resumen', 'modal', true, 'user-resumen');
        
        this.btnCancelarElement = this.element.querySelector(
          '#cancelar-input'
        ) as HTMLButtonElement;

        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
        this.btnCancelarElement.addEventListener('click', this.cancelHandler);        
    }

    renderContent() {
        // this.element.querySelector('img')!.setAttribute('alt',this.modelo.name);
        // this.element.querySelector('h2')!.textContent = this.modelo.name;
     }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
    }
    
    @Autobind
    private cancelHandler() {
        this.hostElement.innerHTML = '';
        this.hostElement.style.display = 'none';
    }
}
