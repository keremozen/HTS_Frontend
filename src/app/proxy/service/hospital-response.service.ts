import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalResponseDto, SaveHospitalResponseDto } from '../dto/hospital-response/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalResponseService {
  apiName = 'Default';
  

  create = (hospitalResponse: SaveHospitalResponseDto) =>
    this.restService.request<any, HospitalResponseDto>({
      method: 'POST',
      url: '/api/app/hospital-response',
      body: hospitalResponse,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital-response/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, HospitalResponseDto>({
      method: 'GET',
      url: `/api/app/hospital-response/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<HospitalResponseDto>>({
      method: 'GET',
      url: '/api/app/hospital-response',
    },
    { apiName: this.apiName });
  

  update = (id: number, hospitalResponse: SaveHospitalResponseDto) =>
    this.restService.request<any, HospitalResponseDto>({
      method: 'PUT',
      url: `/api/app/hospital-response/${id}`,
      body: hospitalResponse,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
