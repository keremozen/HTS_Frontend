export interface IPatientNoteStatus {
    Id:number;
    Name:string;
    Description:string;
}

export class PatientNoteStatus implements IPatientNoteStatus {
    Id:number;
    Name:string;
    Description:string;
}