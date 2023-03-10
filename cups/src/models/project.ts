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
        public id: number,
        public name: string,
        public materials: string,
        public description: string,
        public price: number,
        public img: string,
        public model: string,
        public colors: string[]
    ) { }
}

export class Project {
    constructor(
        public id: string,
        public title?: string,
        public description?: string,
        public quantity: number = 0,
        public color?: string,
        public desing?: string,
        public model?: Modelo,
        public status?: ProjectStatus,
        public custom?: Custom | null,

    ) {}
}