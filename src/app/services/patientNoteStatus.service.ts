import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPatientNoteStatus } from '../models/patientNoteStatus.model';

@Injectable()
export class PatientNoteStatusService {

    constructor(private http: HttpClient) { }

    getPatientNoteStatusList(): Observable<IPatientNoteStatus[]> {
        return of([{
            Id: 1,
            Name: "Patient Note 1",
            Description: "Patient Note 1 Description"
        },
        {
            Id: 2,
            Name: "Patient Note 2",
            Description: "Patient Note 2 Description"
        }]);
    }
}