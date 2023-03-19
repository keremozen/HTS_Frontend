export interface IPatientDocument {
    Id: number;
    PatientId: number;
    TypeId: number;
    Document: string;
    Description: string;
    StatusId: number;
    CreatedBy: string;
    Created: Date;
}

export class PatientDocument implements IPatientDocument {
    Id: number;
    PatientId: number;
    TypeId: number;
    Document: string;
    Description: string;
    StatusId: number;
    CreatedBy: string;
    Created: Date;
}