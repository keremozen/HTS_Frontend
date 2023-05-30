import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { RejectReasonDto, SaveRejectReasonDto } from '../dto/reject-reason/models';

@Injectable({
  providedIn: 'root',
})
export class RejectReasonService {
  apiName = 'Default';
  

  create = (rejectReason: SaveRejectReasonDto) =>
    this.restService.request<any, RejectReasonDto>({
      method: 'POST',
      url: '/api/app/reject-reason',
      body: rejectReason,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/reject-reason/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, RejectReasonDto>({
      method: 'GET',
      url: `/api/app/reject-reason/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<RejectReasonDto>>({
      method: 'GET',
      url: '/api/app/reject-reason',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, rejectReason: SaveRejectReasonDto) =>
    this.restService.request<any, RejectReasonDto>({
      method: 'PUT',
      url: `/api/app/reject-reason/${id}`,
      body: rejectReason,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
