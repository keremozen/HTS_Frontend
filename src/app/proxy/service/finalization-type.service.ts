import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { FinalizationTypeDto, SaveFinalizationTypeDto } from '../dto/finalization-type/models';

@Injectable({
  providedIn: 'root',
})
export class FinalizationTypeService {
  apiName = 'Default';
  

  create = (finalizationType: SaveFinalizationTypeDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/finalization-type',
      body: finalizationType,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/finalization-type/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, FinalizationTypeDto>({
      method: 'GET',
      url: `/api/app/finalization-type/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, ListResultDto<FinalizationTypeDto>>({
      method: 'GET',
      url: '/api/app/finalization-type',
    },
    { apiName: this.apiName });
  

  update = (id: number, finalizationType: SaveFinalizationTypeDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/finalization-type/${id}`,
      body: finalizationType,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
