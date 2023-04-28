import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProcessCostDto, SaveProcessCostDto } from '../dto/process-cost/models';

@Injectable({
  providedIn: 'root',
})
export class ProcessCostService {
  apiName = 'Default';
  

  create = (processCost: SaveProcessCostDto) =>
    this.restService.request<any, ProcessCostDto>({
      method: 'POST',
      url: '/api/app/process-cost',
      body: processCost,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/process-cost/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ProcessCostDto>({
      method: 'GET',
      url: `/api/app/process-cost/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<ProcessCostDto>>({
      method: 'GET',
      url: '/api/app/process-cost',
    },
    { apiName: this.apiName });
  

  update = (id: number, processCost: SaveProcessCostDto) =>
    this.restService.request<any, ProcessCostDto>({
      method: 'PUT',
      url: `/api/app/process-cost/${id}`,
      body: processCost,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
