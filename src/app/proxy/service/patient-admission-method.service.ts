import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PatientAdmissionMethodDto, SavePatientAdmissionMethodDto } from '../dto/patient-admission-method/models';

@Injectable({
  providedIn: 'root',
})
export class PatientAdmissionMethodService {
  apiName = 'Default';
  

  create = (patientAdmissionMethod: SavePatientAdmissionMethodDto) =>
    this.restService.request<any, PatientAdmissionMethodDto>({
      method: 'POST',
      url: '/api/app/patient-admission-method',
      body: patientAdmissionMethod,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/patient-admission-method/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, PatientAdmissionMethodDto>({
      method: 'GET',
      url: `/api/app/patient-admission-method/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<PatientAdmissionMethodDto>>({
      method: 'GET',
      url: '/api/app/patient-admission-method',
    },
    { apiName: this.apiName });
  

  update = (id: number, patientAdmissionMethod: SavePatientAdmissionMethodDto) =>
    this.restService.request<any, PatientAdmissionMethodDto>({
      method: 'PUT',
      url: `/api/app/patient-admission-method/${id}`,
      body: patientAdmissionMethod,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
