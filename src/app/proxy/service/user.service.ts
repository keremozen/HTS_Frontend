import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiName = 'Default';
  

  getByIdById = (id: string) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'GET',
      url: `/api/app/user/${id}/by-id`,
    },
    { apiName: this.apiName });
  

  getByRole = (roleName: string) =>
    this.restService.request<any, IdentityUserDto[]>({
      method: 'GET',
      url: '/api/app/user/by-role',
      params: { roleName },
    },
    { apiName: this.apiName });
  

  getHospitalPricerList = () =>
    this.restService.request<any, IdentityUserDto[]>({
      method: 'GET',
      url: '/api/app/user/hospital-pricer-list',
    },
    { apiName: this.apiName });
  

  getHospitalStaffList = () =>
    this.restService.request<any, IdentityUserDto[]>({
      method: 'GET',
      url: '/api/app/user/hospital-staff-list',
    },
    { apiName: this.apiName });
  

  getInterpreterList = () =>
    this.restService.request<any, IdentityUserDto[]>({
      method: 'GET',
      url: '/api/app/user/interpreter-list',
    },
    { apiName: this.apiName });
  

  getTikStaffList = () =>
    this.restService.request<any, IdentityUserDto[]>({
      method: 'GET',
      url: '/api/app/user/tik-staff-list',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
