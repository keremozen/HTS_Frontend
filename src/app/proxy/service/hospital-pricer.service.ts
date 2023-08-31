import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalPricerDto, SaveHospitalPricerDto } from '../dto/hospital-pricer/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalPricerService {
  apiName = 'Default';
  

  create = (hospitalPricer: SaveHospitalPricerDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/hospital-pricer',
      body: hospitalPricer,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital-pricer/${id}`,
    },
    { apiName: this.apiName });
  

  getByHospitalList = (hospitalId: number, isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<HospitalPricerDto>>({
      method: 'GET',
      url: `/api/app/hospital-pricer/by-hospital-list/${hospitalId}`,
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, hospitalPricer: SaveHospitalPricerDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/hospital-pricer/${id}`,
      body: hospitalPricer,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
