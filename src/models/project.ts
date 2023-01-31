export enum ProjectStatus{
    Active,
    Finished
}

export class Custom{
    constructor(
        public id: string,
        public text: string,
        public width: number,
        public height: number,
    ) {}
}

export class Modelo{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public icon: string,
        public model: string,
    ) { }
}

export class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public color: string,
        public desing: string,
        public model: Modelo,
        public status: ProjectStatus,
        public custom: Custom | null,

    ) {}
}