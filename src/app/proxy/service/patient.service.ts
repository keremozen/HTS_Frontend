import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { FilterPatientDto, PatientDto, SavePatientDto } from '../dto/patient/models';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  apiName = 'Default';
  

  create = (patient: SavePatientDto) =>
    this.restService.request<any, PatientDto>({
      method: 'POST',
      url: '/api/app/patient',
      body: patient,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/patient/${id}`,
    },
    { apiName: this.apiName });
  

  filterList = (filter: FilterPatientDto) =>
    this.restService.request<any, PagedResultDto<PatientDto>>({
      method: 'POST',
      url: '/api/app/patient/filter-list',
      body: filter,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, PatientDto>({
      method: 'GET',
      url: `/api/app/patient/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<PatientDto>>({
      method: 'GET',
      url: '/api/app/patient',
    },
    { apiName: this.apiName });
  

  update = (id: number, patient: SavePatientDto) =>
    this.restService.request<any, PatientDto>({
      method: 'PUT',
      url: `/api/app/patient/${id}`,
      body: patient,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
