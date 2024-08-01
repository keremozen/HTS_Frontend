import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalInterpreterDto, SaveHospitalInterpreterDto } from '../dto/hospital-interpreter/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalInterpreterService {
  apiName = 'Default';
  

  create = (hospitalInterpreter: SaveHospitalInterpreterDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/hospital-interpreter',
      body: hospitalInterpreter,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital-interpreter/${id}`,
    },
    { apiName: this.apiName });
  

  getByHospitalList = (hospitalId: number, isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<HospitalInterpreterDto>>({
      method: 'GET',
      url: `/api/app/hospital-interpreter/by-hospital-list/${hospitalId}`,
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, hospitalInterpreter: SaveHospitalInterpreterDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/hospital-interpreter/${id}`,
      body: hospitalInterpreter,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
