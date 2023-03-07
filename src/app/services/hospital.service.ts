import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHospital } from '../models/hospital.model';

@Injectable()
export class HospitalService {


    constructor(private http: HttpClient) { }


    getHospitalList(): Observable<IHospital[]> {
        return of([{
            Id: 1,
            Name: "Memorial Ankara",
            PhoneNumber: "3122100000",
            ContactInfoName: "Kerem Özen",
            ContactInfoPhoneNumber: "5057388503"
        },
        {
            Id: 2,
            Name: "Güven Ankara",
            PhoneNumber: "3122200000",
            ContactInfoName: "Bill Gates",
            ContactInfoPhoneNumber: "5327857378"
        }]);
    }
}