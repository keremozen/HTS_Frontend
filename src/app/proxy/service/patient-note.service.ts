import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PatientNoteDto, SavePatientNoteDto } from '../dto/patient-note/models';

@Injectable({
  providedIn: 'root',
})
export class PatientNoteService {
  apiName = 'Default';
  

  create = (patientNote: SavePatientNoteDto) =>
    this.restService.request<any, PatientNoteDto>({
      method: 'POST',
      url: '/api/app/patient-note',
      body: patientNote,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/patient-note/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (patientId: number) =>
    this.restService.request<any, PagedResultDto<PatientNoteDto>>({
      method: 'GET',
      url: '/api/app/patient-note',
      params: { patientId },
    },
    { apiName: this.apiName });
  

  updateStatusByIdAndStatusId = (id: number, statusId: number) =>
    this.restService.request<any, PatientNoteDto>({
      method: 'PUT',
      url: `/api/app/patient-note/${id}/status/${statusId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
