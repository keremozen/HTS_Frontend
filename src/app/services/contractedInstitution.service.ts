import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IContractedInstitution } from '../models/contractedInstitution.model';

@Injectable()
export class ContractedInstitutionService {

    constructor(private http: HttpClient) { }

    getContractedInstitutionList(): Observable<IContractedInstitution[]> {
        return of([{
            Id: 1,
            Name: "Institution 1",
            Description: "Institution 1 Description"
        },
        {
            Id: 2,
            Name: "Institution 2",
            Description: "Institution 2 Description"
        }]);
    }
}