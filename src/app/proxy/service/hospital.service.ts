import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalDto, SaveHospitalDto } from '../dto/hospital/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  apiName = 'Default';
  

  create = (hospital: SaveHospitalDto) =>
    this.restService.request<any, HospitalDto>({
      method: 'POST',
      url: '/api/app/hospital',
      body: hospital,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, HospitalDto>({
      method: 'GET',
      url: `/api/app/hospital/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<HospitalDto>>({
      method: 'GET',
      url: '/api/app/hospital',
    },
    { apiName: this.apiName });
  

  update = (id: number, hospital: SaveHospitalDto) =>
    this.restService.request<any, HospitalDto>({
      method: 'PUT',
      url: `/api/app/hospital/${id}`,
      body: hospital,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
