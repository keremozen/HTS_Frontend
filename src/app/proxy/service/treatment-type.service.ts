import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SaveTreatmentTypeDto, TreatmentTypeDto } from '../dto/treatment-type/models';

@Injectable({
  providedIn: 'root',
})
export class TreatmentTypeService {
  apiName = 'Default';
  

  create = (treatmentType: SaveTreatmentTypeDto) =>
    this.restService.request<any, TreatmentTypeDto>({
      method: 'POST',
      url: '/api/app/treatment-type',
      body: treatmentType,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/treatment-type/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, TreatmentTypeDto>({
      method: 'GET',
      url: `/api/app/treatment-type/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<TreatmentTypeDto>>({
      method: 'GET',
      url: '/api/app/treatment-type',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, treatmentType: SaveTreatmentTypeDto) =>
    this.restService.request<any, TreatmentTypeDto>({
      method: 'PUT',
      url: `/api/app/treatment-type/${id}`,
      body: treatmentType,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
