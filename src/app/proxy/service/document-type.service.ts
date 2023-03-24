import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DocumentTypeDto, SaveDocumentTypeDto } from '../dto/document-type/models';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  apiName = 'Default';
  

  create = (documentType: SaveDocumentTypeDto) =>
    this.restService.request<any, DocumentTypeDto>({
      method: 'POST',
      url: '/api/app/document-type',
      body: documentType,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/document-type/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, DocumentTypeDto>({
      method: 'GET',
      url: `/api/app/document-type/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<DocumentTypeDto>>({
      method: 'GET',
      url: '/api/app/document-type',
    },
    { apiName: this.apiName });
  

  update = (id: number, documentType: SaveDocumentTypeDto) =>
    this.restService.request<any, DocumentTypeDto>({
      method: 'PUT',
      url: `/api/app/document-type/${id}`,
      body: documentType,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
