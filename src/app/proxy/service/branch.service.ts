import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BranchDto, SaveBranchDto } from '../dto/branch/models';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  apiName = 'Default';
  

  create = (major: SaveBranchDto) =>
    this.restService.request<any, BranchDto>({
      method: 'POST',
      url: '/api/app/branch',
      body: major,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/branch/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, BranchDto>({
      method: 'GET',
      url: `/api/app/branch/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<BranchDto>>({
      method: 'GET',
      url: '/api/app/branch',
    },
    { apiName: this.apiName });
  

  update = (id: number, major: SaveBranchDto) =>
    this.restService.request<any, BranchDto>({
      method: 'PUT',
      url: `/api/app/branch/${id}`,
      body: major,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
