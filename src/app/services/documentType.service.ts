import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDocumentType } from '../models/documentType.model';

@Injectable()
export class DocumentTypeService {

    constructor(private http: HttpClient) { }

    getDocumentTypeList(): Observable<IDocumentType[]> {
        return of([{
            Id: 1,
            Name: "Document Type 1",
            Description: "Document Type 1 Description"
        },
        {
            Id: 2,
            Name: "Document Type 2",
            Description: "Document Type 2 Description"
        }]);
    }
}