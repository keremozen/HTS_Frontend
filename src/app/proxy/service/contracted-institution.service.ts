import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ContractedInstitutionDto, SaveContractedInstitutionDto } from '../dto/contracted-institution/models';

@Injectable({
  providedIn: 'root',
})
export class ContractedInstitutionService {
  apiName = 'Default';
  

  create = (contractedInstitution: SaveContractedInstitutionDto) =>
    this.restService.request<any, ContractedInstitutionDto>({
      method: 'POST',
      url: '/api/app/contracted-institution',
      body: contractedInstitution,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/contracted-institution/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ContractedInstitutionDto>({
      method: 'GET',
      url: `/api/app/contracted-institution/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<ContractedInstitutionDto>>({
      method: 'GET',
      url: '/api/app/contracted-institution',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, contractedInstitution: SaveContractedInstitutionDto) =>
    this.restService.request<any, ContractedInstitutionDto>({
      method: 'PUT',
      url: `/api/app/contracted-institution/${id}`,
      body: contractedInstitution,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
