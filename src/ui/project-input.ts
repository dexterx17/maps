import Cmp from './base-component';
import * as Validation from '../util/validation';
import { autobind as Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { Project } from '../models/project';

// ProjectInput Class
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    btnCancelarElement: HTMLButtonElement;

    constructor() {
        super('project-input', 'modal', true, 'user-input');
        this.titleInputElement = this.element.querySelector(
            'input[name="name"]'
        ) as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            'textarea[name="description"]'
        ) as HTMLInputElement;
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
        this.titleInputElement.value = projectState.active.title ? projectState.active.title : this.titleInputElement.value;
        this.descriptionInputElement.value = projectState.active.description ? projectState.active.description : this.descriptionInputElement.value;
     }

    private gatherUserInput(): [string, string] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        //const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: false,
            //minLength: 5
        };

        if (
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descriptionValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc] = userInput;
            projectState.updateSettings(title, desc);
            this.clearInputs();
        }
    }
    
    @Autobind
    private cancelHandler() {
        this.hostElement.innerHTML = '';
        this.hostElement.style.display = 'none';
    }
}
