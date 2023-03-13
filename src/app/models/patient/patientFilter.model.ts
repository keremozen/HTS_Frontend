export interface IPatientFilter {
    Name:string;
    Surname:string;
    Nationalities:number[];
    PassportNo: string;
    Genders: number[];
    NativeLanguage: number;
    SecondLanguage: number;
    TreatmentProcess: string;
}

export class PatientFilter implements IPatientFilter {
    Name:string;
    Surname:string;
    Nationalities:number[];
    PassportNo: string;
    Genders: number[];
    NativeLanguage: number;
    SecondLanguage: number;
    TreatmentProcess: string;
}