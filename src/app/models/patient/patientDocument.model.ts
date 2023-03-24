export interface IPatientDocument {
    Id: number;
    PatientId: number;
    TypeId: number;
    Content: string;
    FileName: string;
    Description: string;
    StatusId: number;
    CreatedBy: string;
    Created: Date;
}

export class PatientDocument implements IPatientDocument {
    Id: number;
    PatientId: number;
    TypeId: number;
    Content: string;
    FileName: string;
    Description: string;
    StatusId: number;
    CreatedBy: string;
    Created: Date;
}