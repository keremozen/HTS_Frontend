export interface IPatientNote {
    Id: number;
    PatientId: number;
    Note: string;
    StatusId: number;
    Created: Date;
    CreatedBy: string;
}

export class PatientNote implements IPatientNote {
    Id: number;
    PatientId: number;
    Note: string;
    StatusId: number;
    Created: Date;
    CreatedBy: string;
}