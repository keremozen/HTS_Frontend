export interface IHospital {
    Id:number;
    Name:string;
    PhoneNumber:string;
    ContactInfoName: string;
    ContactInfoPhoneNumber: string;
}

export class Hospital implements IHospital {
    Id: number;
    Name: string;
    PhoneNumber: string;
    ContactInfoName: string;
    ContactInfoPhoneNumber: string;

}