import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalStaffDto, SaveHospitalStaffDto } from '../dto/hospital-staff/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalStaffService {
  apiName = 'Default';
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital-staff/${id}`,
    },
    { apiName: this.apiName });
  

  getByInstitutionList = (hospitalId: number) =>
    this.restService.request<any, PagedResultDto<HospitalStaffDto>>({
      method: 'GET',
      url: `/api/app/hospital-staff/by-institution-list/${hospitalId}`,
    },
    { apiName: this.apiName });
  

  save = (hospitalId: number, hospitalStaffs: SaveHospitalStaffDto[]) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/hospital-staff/save/${hospitalId}`,
      body: hospitalStaffs,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
