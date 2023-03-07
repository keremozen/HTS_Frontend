import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILanguage } from '../models/language.model';

@Injectable()
export class LanguageService {

    constructor(private http: HttpClient) { }
    
    getLanguageList(): Observable<ILanguage[]> {
        return of([{
            Id: 1,
            Name: "Turkish",
            Code: "TC"
        }]);
    }
}