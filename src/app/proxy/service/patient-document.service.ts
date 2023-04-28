import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PatientDocumentDto, SavePatientDocumentDto } from '../dto/patient-document/models';

@Injectable({
  providedIn: 'root',
})
export class PatientDocumentService {
  apiName = 'Default';
  

  create = (patientNote: SavePatientDocumentDto) =>
    this.restService.request<any, PatientDocumentDto>({
      method: 'POST',
      url: '/api/app/patient-document',
      body: patientNote,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/patient-document/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (patientId: number) =>
    this.restService.request<any, PagedResultDto<PatientDocumentDto>>({
      method: 'GET',
      url: '/api/app/patient-document',
      params: { patientId },
    },
    { apiName: this.apiName });
  

  updateStatusByIdAndStatusId = (id: number, statusId: number) =>
    this.restService.request<any, PatientDocumentDto>({
      method: 'PUT',
      url: `/api/app/patient-document/${id}/status/${statusId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
