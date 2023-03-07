export interface IPatientAdmissionMethod {
    Id:number;
    Name:string;
    Description:string;
}

export class PatientAdmissionMethod implements IPatientAdmissionMethod {
    Id:number;
    Name:string;
    Description:string;
}