import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHospitalConsultationStatus } from '../models/hospitalConsultationStatus.model';

@Injectable()
export class HospitalConsultationStatusService {

    constructor(private http: HttpClient) { }

    getHospitalConsultationStatusList(): Observable<IHospitalConsultationStatus[]> {
        return of([{
            Id: 1,
            Name: "Hospital Consultation Status 1",
            Description: "Hospital Consultation Status 1 Description"
        },
        {
            Id: 2,
            Name: "Hospital Consultation Status 2",
            Description: "Hospital Consultation Status 2 Description"
        }]);
    }
}