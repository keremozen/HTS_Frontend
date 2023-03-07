import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INationality } from '../models/nationality.model';

@Injectable()
export class NationalityService {

    constructor(private http: HttpClient) { }

    getNationalityList(): Observable<INationality[]> {
        return of([{
            Id: 1,
            Name: "Turkish",
            Code: "TC"
        }]);
    }
}