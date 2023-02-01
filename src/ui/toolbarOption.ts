import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectInput } from './project-input';
import { ProjectModel } from './project-model';
import { ProjectColor } from './project-color';

export class ToolbarOptions<T extends HTMLElement, U extends HTMLElement> {
    toolbarContainer: HTMLElement;
    btnProyecto: HTMLDivElement;
    btnModelo: HTMLDivElement;
    btnColor: HTMLDivElement;
    modalContainer: HTMLElement;
    
    constructor() {
        this.toolbarContainer = document.getElementById('toolbar-options');
        this.modalContainer = document.getElementById('modal');
        this.btnProyecto = this.toolbarContainer.querySelector('#btn-proyecto');
        this.btnModelo = this.toolbarContainer.querySelector('#btn-modelo');
        this.btnColor= this.toolbarContainer.querySelector('#btn-color');
        this.configure();
    }

    configure() {
        this.modalContainer.style.display = 'none';
        this.btnProyecto.addEventListener('click', this.openProjectSettings);
        this.btnModelo.addEventListener('click', this.openModelSettings);
        this.btnColor.addEventListener('click', this.openColorSettings);

        projectState.addListener(() => {
            //this.renderProjects();
            this.modalContainer.innerHTML = '';
            this.modalContainer.style.display = 'none';
          });
    }
    
    @autobind
    private openProjectSettings() {
        this.modalContainer.style.display = 'block';
        new ProjectInput();
    }

    @autobind
    private openModelSettings() {
        this.modalContainer.style.display = 'block';
        new ProjectModel();
    }

    @autobind
    private openColorSettings() {
        this.modalContainer.style.display = 'block';
        new ProjectColor();
    }
}