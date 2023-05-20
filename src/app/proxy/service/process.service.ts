import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProcessDto, SaveProcessDto } from '../dto/process/models';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  apiName = 'Default';
  

  create = (process: SaveProcessDto) =>
    this.restService.request<any, ProcessDto>({
      method: 'POST',
      url: '/api/app/process',
      body: process,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/process/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ProcessDto>({
      method: 'GET',
      url: `/api/app/process/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<ProcessDto>>({
      method: 'GET',
      url: '/api/app/process',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, process: SaveProcessDto) =>
    this.restService.request<any, ProcessDto>({
      method: 'PUT',
      url: `/api/app/process/${id}`,
      body: process,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
