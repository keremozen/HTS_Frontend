import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProformaDto, ProformaListDto, RejectProformaDto, SaveProformaDto } from '../dto/proforma/models';

@Injectable({
  providedIn: 'root',
})
export class ProformaService {
  apiName = 'Default';
  

  approveMFB = (id: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/proforma/${id}/approve-mFB`,
    },
    { apiName: this.apiName });
  

  getById = (proformaId: number) =>
    this.restService.request<any, ProformaDto>({
      method: 'GET',
      url: `/api/app/proforma/by-id/${proformaId}`,
    },
    { apiName: this.apiName });
  

  getNameListByOperationId = (operationId: number) =>
    this.restService.request<any, ProformaListDto[]>({
      method: 'GET',
      url: `/api/app/proforma/name-list-by-operation-id/${operationId}`,
    },
    { apiName: this.apiName });
  

  rejectMFB = (rejectProforma: RejectProformaDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/proforma/reject-mFB',
      body: rejectProforma,
    },
    { apiName: this.apiName });
  

  save = (proforma: SaveProformaDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/proforma/save',
      body: proforma,
    },
    { apiName: this.apiName });
  

  send = (id: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/proforma/${id}/send`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
