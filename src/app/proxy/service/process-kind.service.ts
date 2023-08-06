import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProcessKindDto, SaveProcessKindDto } from '../dto/process-kind/models';

@Injectable({
  providedIn: 'root',
})
export class ProcessKindService {
  apiName = 'Default';
  

  create = (processKind: SaveProcessKindDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/process-kind',
      body: processKind,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/process-kind/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ProcessKindDto>({
      method: 'GET',
      url: `/api/app/process-kind/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, ListResultDto<ProcessKindDto>>({
      method: 'GET',
      url: '/api/app/process-kind',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, processKind: SaveProcessKindDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/process-kind/${id}`,
      body: processKind,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
