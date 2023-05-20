import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProcessTypeDto, SaveProcessTypeDto } from '../dto/process-type/models';

@Injectable({
  providedIn: 'root',
})
export class ProcessTypeService {
  apiName = 'Default';
  

  create = (processType: SaveProcessTypeDto) =>
    this.restService.request<any, ProcessTypeDto>({
      method: 'POST',
      url: '/api/app/process-type',
      body: processType,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/process-type/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ProcessTypeDto>({
      method: 'GET',
      url: `/api/app/process-type/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<ProcessTypeDto>>({
      method: 'GET',
      url: '/api/app/process-type',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, processType: SaveProcessTypeDto) =>
    this.restService.request<any, ProcessTypeDto>({
      method: 'PUT',
      url: `/api/app/process-type/${id}`,
      body: processType,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
