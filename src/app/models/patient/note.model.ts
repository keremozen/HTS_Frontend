export interface INote {
    Id: number;
    Message: string;
    Created: Date;
    CreatedBy: string;
}

export class Note implements INote {
    Id: number;
    Message: string;
    Created: Date;
    CreatedBy: string;
}