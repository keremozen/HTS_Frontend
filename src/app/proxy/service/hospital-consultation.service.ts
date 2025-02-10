import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalConsultationDto, SaveHospitalConsultationDto } from '../dto/hospital-consultation/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalConsultationService {
  apiName = 'Default';
  

  create = (hospitalConsultation: SaveHospitalConsultationDto, createNewConsultation: boolean) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/hospital-consultation',
      params: { createNewConsultation },
      body: hospitalConsultation,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital-consultation/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, HospitalConsultationDto>({
      method: 'GET',
      url: `/api/app/hospital-consultation/${id}`,
    },
    { apiName: this.apiName });
  

  getByHospitalId = (hospitalId: number) =>
    this.restService.request<any, PagedResultDto<HospitalConsultationDto>>({
      method: 'GET',
      url: `/api/app/hospital-consultation/by-hospital-id/${hospitalId}`,
    },
    { apiName: this.apiName });
  

  getByPatientTreatmenProcess = (ptpId: number) =>
    this.restService.request<any, PagedResultDto<HospitalConsultationDto>>({
      method: 'GET',
      url: `/api/app/hospital-consultation/by-patient-treatmen-process/${ptpId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
