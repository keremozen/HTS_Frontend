import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalResponseDto, SaveHospitalResponseDto } from '../dto/hospital-response/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalResponseService {
  apiName = 'Default';
  

  approve = (hospitalResponseId: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/hospital-response/approve/${hospitalResponseId}`,
    },
    { apiName: this.apiName });
  

  create = (hospitalResponse: SaveHospitalResponseDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/hospital-response',
      body: hospitalResponse,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, HospitalResponseDto>({
      method: 'GET',
      url: `/api/app/hospital-response/${id}`,
    },
    { apiName: this.apiName });
  

  getByHospitalConsultation = (consultationId: number) =>
    this.restService.request<any, HospitalResponseDto>({
      method: 'GET',
      url: `/api/app/hospital-response/by-hospital-consultation/${consultationId}`,
    },
    { apiName: this.apiName });
  

  getByHospitalId = (hospitalId: number) =>
    this.restService.request<any, PagedResultDto<HospitalResponseDto>>({
      method: 'GET',
      url: `/api/app/hospital-response/by-hospital-id/${hospitalId}`,
    },
    { apiName: this.apiName });
  

  reject = (hospitalResponseId: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/hospital-response/reject/${hospitalResponseId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
