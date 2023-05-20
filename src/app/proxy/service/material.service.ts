import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { MaterialDto, SaveMaterialDto } from '../dto/material/models';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  apiName = 'Default';
  

  create = (major: SaveMaterialDto) =>
    this.restService.request<any, MaterialDto>({
      method: 'POST',
      url: '/api/app/material',
      body: major,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/material/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, MaterialDto>({
      method: 'GET',
      url: `/api/app/material/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<MaterialDto>>({
      method: 'GET',
      url: '/api/app/material',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, material: SaveMaterialDto) =>
    this.restService.request<any, MaterialDto>({
      method: 'PUT',
      url: `/api/app/material/${id}`,
      body: material,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
