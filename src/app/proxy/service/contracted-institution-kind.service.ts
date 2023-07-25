import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ContractedInstitutionKindDto, SaveContractedInstitutionKindDto } from '../dto/contracted-institution-kind/models';

@Injectable({
  providedIn: 'root',
})
export class ContractedInstitutionKindService {
  apiName = 'Default';
  

  create = (type: SaveContractedInstitutionKindDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/contracted-institution-kind',
      body: type,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/contracted-institution-kind/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ContractedInstitutionKindDto>({
      method: 'GET',
      url: `/api/app/contracted-institution-kind/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<ContractedInstitutionKindDto>>({
      method: 'GET',
      url: '/api/app/contracted-institution-kind',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, type: SaveContractedInstitutionKindDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/contracted-institution-kind/${id}`,
      body: type,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
