import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { NationalityDto, SaveNationalityDto } from '../dto/nationality/models';

@Injectable({
  providedIn: 'root',
})
export class NationalityService {
  apiName = 'Default';
  

  create = (nationality: SaveNationalityDto) =>
    this.restService.request<any, NationalityDto>({
      method: 'POST',
      url: '/api/app/nationality',
      body: nationality,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/nationality/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, NationalityDto>({
      method: 'GET',
      url: `/api/app/nationality/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<NationalityDto>>({
      method: 'GET',
      url: '/api/app/nationality',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, nationality: SaveNationalityDto) =>
    this.restService.request<any, NationalityDto>({
      method: 'PUT',
      url: `/api/app/nationality/${id}`,
      body: nationality,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
