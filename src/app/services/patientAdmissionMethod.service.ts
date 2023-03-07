import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPatientAdmissionMethod } from '../models/patientAdmissionMethod.model';

@Injectable()
export class PatientAdmissionMethodService {

    constructor(private http: HttpClient) { }

    getPatientAdmissionMethodList(): Observable<IPatientAdmissionMethod[]> {
        return of([{
            Id: 1,
            Name: "Patient Admission Method 1",
            Description: "Patient Admission Method 1 Description"
        },
        {
            Id: 2,
            Name: "Patient Admission Method 2",
            Description: "Patient Admission Method 2 Description"
        }]);
    }
}