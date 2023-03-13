export interface ICRUDPatient {
    Name: string;
    Surname: string;
    Nationality: number;
    PassportNo: string;
    BirthDate: Date;
    Gender: number;
    PhoneNo: number;
    Email: string;
    NativeLanguage: number;
    SecondLanguage: number;
}

export class CRUDPatient implements ICRUDPatient {
    Name: string;
    Surname: string;
    Nationality: number;
    PassportNo: string;
    BirthDate: Date;
    Gender: number;
    PhoneNo: number;
    Email: string;
    NativeLanguage: number;
    SecondLanguage: number;
}