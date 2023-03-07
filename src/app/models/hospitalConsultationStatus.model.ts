export interface IHospitalConsultationStatus {
    Id:number;
    Name:string;
    Description:string;
}

export class HospitalConsultationStatus implements IHospitalConsultationStatus {
    Id:number;
    Name:string;
    Description:string;
}