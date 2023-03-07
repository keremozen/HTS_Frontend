import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPatientDocumentStatus } from '../models/patientDocumentStatus.model';

@Injectable()
export class PatientDocumentStatusService {

    constructor(private http: HttpClient) { }

    getPatientDocumentStatusList(): Observable<IPatientDocumentStatus[]> {
        return of([{
            Id: 1,
            Name: "Patient Document Status 1",
            Description: "Patient Document Status 1 Description"
        },
        {
            Id: 2,
            Name: "Patient Document Status 2",
            Description: "Patient Document Status 2 Description"
        }]);
    }
}