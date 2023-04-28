import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalizationTypeDto, SaveHospitalizationTypeDto } from '../dto/hospitalization-type/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalizationTypeService {
  apiName = 'Default';
  

  create = (hospitalizationType: SaveHospitalizationTypeDto) =>
    this.restService.request<any, HospitalizationTypeDto>({
      method: 'POST',
      url: '/api/app/hospitalization-type',
      body: hospitalizationType,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospitalization-type/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, HospitalizationTypeDto>({
      method: 'GET',
      url: `/api/app/hospitalization-type/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<HospitalizationTypeDto>>({
      method: 'GET',
      url: '/api/app/hospitalization-type',
    },
    { apiName: this.apiName });
  

  update = (id: number, hospitalizationType: SaveHospitalizationTypeDto) =>
    this.restService.request<any, HospitalizationTypeDto>({
      method: 'PUT',
      url: `/api/app/hospitalization-type/${id}`,
      body: hospitalizationType,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
