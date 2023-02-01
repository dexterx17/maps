import Cmp from './base-component';
import * as Validation from '../util/validation';
import { autobind as Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { Project } from '../models/project';

// ProjectTotal Class
export class ProjectTotal{
    element: HTMLFormElement;
    priceElement: HTMLElement;
    totalElement: HTMLElement;
    qtyInputElement: HTMLInputElement;

    constructor() {
        this.element = document.querySelector(
            '#resumen-form'
        ) as HTMLFormElement;

        this.qtyInputElement = document.querySelector(
            '#qty-cups'
        ) as HTMLInputElement;

        this.priceElement = document.querySelector(
            '#unit-price'
        ) as HTMLElement;

        this.totalElement = document.querySelector(
            '#total-price'
        ) as HTMLElement;

        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);

        this.qtyInputElement.addEventListener('change', this.updateQty);        
        
        
        projectState.addListener(() => {
            //this.renderProjects();
            this.renderContent();
        });
    }

    renderContent() {
        console.log('render totals', projectState.active)
        let qty = this.qtyInputElement.value;
        let price = projectState.active.model ? projectState.active.model.price : 4.99;
        let total = +qty * price;

        this.priceElement.textContent = `$ ${price}`;
        this.totalElement.textContent = `$ ${total.toFixed(2)}`;
        
    }
    private clearInputs() {
        //this.titleInputElement.value = '';
        //this.descriptionInputElement.value = '';
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherQtyInput();
        if (Array.isArray(userInput)) {
            const [qty] = userInput;

            alert('submit');
        }
    }

    private gatherQtyInput(): [number] | void {
        const qtyCups = this.qtyInputElement.value;

        const qtyValidatable: Validation.Validatable = {
            value: +qtyCups,
            required: true,
            min: 2,
            max: 100
        };

        if (
            !Validation.validate(qtyValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [+qtyCups];
        }
    }

    @Autobind
    private updateQty(){
        const userInput = this.gatherQtyInput();
        console.log('userInput',userInput);
        if (Array.isArray(userInput)) {
            const [qty] = userInput;
            projectState.updateQuantity(qty);
            this.renderContent();
        }
    }
}
