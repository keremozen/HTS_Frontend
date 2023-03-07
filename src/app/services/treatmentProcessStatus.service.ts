import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITreatmentProcessStatus } from '../models/treatmentProcessStatus.model';

@Injectable()
export class TreatmentProcessStatusService {

    constructor(private http: HttpClient) { }

    getTreatmentProcessStatusList(): Observable<ITreatmentProcessStatus[]> {
        return of([{
            Id: 1,
            Name: "Treatment Process Status 1",
            Description: "Treatment Process Status 1 Description"
        },
        {
            Id: 2,
            Name: "Treatment Process Status 2",
            Description: "Treatment Process Status 2 Description"
        }]);
    }
}