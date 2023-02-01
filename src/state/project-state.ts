import { Modelo, Project, ProjectStatus } from "../models/project";

// Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private activeProject: Project = new Project("one");
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

	get active(){
		return this.activeProject;
	}

    updateSettings(name: string, description: string) {
        this.activeProject.title = name;
        this.activeProject.description = description;
		this.projects.push(this.activeProject);
        this.updateListeners();
    }

    updateModel(modelo: Modelo) {
		this.activeProject.model = modelo;
		this.updateListeners();
	}
	
	updateColor(color: string){
		this.activeProject.color = color;
		this.updateListeners();
	}

    //   addProject(title: string, description: string, numOfPeople: number) {
    //     const newProject = new Project(
    //       Math.random().toString(),
    //       title,
    //       description,
    //       numOfPeople,
    //       ProjectStatus.Active
    //     );
    //     this.projects.push(newProject);
    //     this.updateListeners();
    //   }

    //   moveProject(projectId: string, newStatus: ProjectStatus) {
    //     const project = this.projects.find(prj => prj.id === projectId);
    //     if (project && project.status !== newStatus) {
    //       project.status = newStatus;
    //       this.updateListeners();
    //     }
    //   }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();
