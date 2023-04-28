import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ContractedInstitutionStaffDto, SaveContractedInstitutionStaffDto } from '../dto/contracted-institution-staff/models';

@Injectable({
  providedIn: 'root',
})
export class ContractedInstitutionStaffService {
  apiName = 'Default';
  

  create = (contractedInstitutionStaff: SaveContractedInstitutionStaffDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/contracted-institution-staff',
      body: contractedInstitutionStaff,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/contracted-institution-staff/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, ContractedInstitutionStaffDto>({
      method: 'GET',
      url: `/api/app/contracted-institution-staff/${id}`,
    },
    { apiName: this.apiName });
  

  getByInstitutionList = (institutionId: number) =>
    this.restService.request<any, PagedResultDto<ContractedInstitutionStaffDto>>({
      method: 'GET',
      url: `/api/app/contracted-institution-staff/by-institution-list/${institutionId}`,
    },
    { apiName: this.apiName });
  

  update = (id: number, contractedInstitutionStaff: SaveContractedInstitutionStaffDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/contracted-institution-staff/${id}`,
      body: contractedInstitutionStaff,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
