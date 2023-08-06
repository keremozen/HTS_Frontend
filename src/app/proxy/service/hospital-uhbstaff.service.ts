import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalUHBStaffDto, SaveHospitalUHBStaffDto } from '../dto/hospital-uhbstaff/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalUHBStaffService {
  apiName = 'Default';
  

  create = (hospitalStaff: SaveHospitalUHBStaffDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/hospital-uHBStaff',
      body: hospitalStaff,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital-uHBStaff/${id}`,
    },
    { apiName: this.apiName });
  

  getByHospitalList = (hospitalId: number) =>
    this.restService.request<any, PagedResultDto<HospitalUHBStaffDto>>({
      method: 'GET',
      url: `/api/app/hospital-uHBStaff/by-hospital-list/${hospitalId}`,
    },
    { apiName: this.apiName });
  

  update = (id: number, hospitalStaff: SaveHospitalUHBStaffDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/hospital-uHBStaff/${id}`,
      body: hospitalStaff,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
