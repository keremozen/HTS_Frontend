import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProcessRelationDto, SaveProcessRelationDto } from '../dto/process-relation/models';

@Injectable({
  providedIn: 'root',
})
export class ProcessRelationService {
  apiName = 'Default';
  

  create = (processRelation: SaveProcessRelationDto) =>
    this.restService.request<any, ProcessRelationDto>({
      method: 'POST',
      url: '/api/app/process-relation',
      body: processRelation,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/process-relation/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ProcessRelationDto>({
      method: 'GET',
      url: `/api/app/process-relation/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<ProcessRelationDto>>({
      method: 'GET',
      url: '/api/app/process-relation',
    },
    { apiName: this.apiName });
  

  update = (id: number, processRelation: SaveProcessRelationDto) =>
    this.restService.request<any, ProcessRelationDto>({
      method: 'PUT',
      url: `/api/app/process-relation/${id}`,
      body: processRelation,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
