export interface IPatientDocumentStatus {
    Id:number;
    Name:string;
    Description:string;
}

export class PatientDocumentStatus implements IPatientDocumentStatus {
    Id:number;
    Name:string;
    Description:string;
}