import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CityDto, SaveCityDto } from '../dto/city/models';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  apiName = 'Default';
  

  create = (city: SaveCityDto) =>
    this.restService.request<any, CityDto>({
      method: 'POST',
      url: '/api/app/city',
      body: city,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/city/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, CityDto>({
      method: 'GET',
      url: `/api/app/city/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<CityDto>>({
      method: 'GET',
      url: '/api/app/city',
    },
    { apiName: this.apiName });
  

  update = (id: number, city: SaveCityDto) =>
    this.restService.request<any, CityDto>({
      method: 'PUT',
      url: `/api/app/city/${id}`,
      body: city,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
