import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ContractedInstitutionTypeDto, SaveContractedInstitutionTypeDto } from '../dto/contracted-institution-type/models';

@Injectable({
  providedIn: 'root',
})
export class ContractedInstitutionTypeService {
  apiName = 'Default';
  

  create = (type: SaveContractedInstitutionTypeDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/contracted-institution-type',
      body: type,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/contracted-institution-type/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ContractedInstitutionTypeDto>({
      method: 'GET',
      url: `/api/app/contracted-institution-type/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<ContractedInstitutionTypeDto>>({
      method: 'GET',
      url: '/api/app/contracted-institution-type',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, type: SaveContractedInstitutionTypeDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/contracted-institution-type/${id}`,
      body: type,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
