import Cmp from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { Modelo } from '../models/project';
import { ModeloItem } from './model-item';

import modelsArray from '../data/models';

// ProjectModel Class
export class ProjectModel extends Cmp<HTMLDivElement, HTMLFormElement> {
    availableModels: Modelo[] = [];

    constructor() {
        super('project-model', 'modal', true, 'user-model');

        this.fetchModels();
        this.configure();
    }

    configure() {
        //this.element.addEventListener('submit', this.submitHandler);
        this.renderModels();
    }

    renderContent() { }

    
    private fetchModels(){
        let parent = this;
        modelsArray.forEach(m => {

            let mod = new Modelo(m.id,m.name,m.materials, m.description, m.precio, m.img, m.img, m.colors);
            
            parent.availableModels.push(mod);
        });
    }

    private renderModels() {
        console.log('this.availableModels',this.availableModels)
        for (const modelItem of this.availableModels) {
            new ModeloItem(this.element.querySelector('#models-container')!.id, modelItem);
        }
    }
}
