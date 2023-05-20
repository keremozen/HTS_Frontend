import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalStaffDto, SaveHospitalStaffDto } from '../dto/hospital-staff/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalStaffService {
  apiName = 'Default';
  

  create = (hospitalStaff: SaveHospitalStaffDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/hospital-staff',
      body: hospitalStaff,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital-staff/${id}`,
    },
    { apiName: this.apiName });
  

  getByHospitalList = (hospitalId: number, isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<HospitalStaffDto>>({
      method: 'GET',
      url: `/api/app/hospital-staff/by-hospital-list/${hospitalId}`,
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, hospitalStaff: SaveHospitalStaffDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/hospital-staff/${id}`,
      body: hospitalStaff,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
