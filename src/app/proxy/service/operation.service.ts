import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { OperationDto, SaveOperationDto } from '../dto/operation/models';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  apiName = 'Default';
  

  cancelOperation = (id: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/operation/${id}/cancel-operation`,
    },
    { apiName: this.apiName });
  

  create = (operation: SaveOperationDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/operation',
      body: operation,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, OperationDto>({
      method: 'GET',
      url: `/api/app/operation/${id}`,
    },
    { apiName: this.apiName });
  

  getByPatientTreatmenProcess = (ptpId: number) =>
    this.restService.request<any, PagedResultDto<OperationDto>>({
      method: 'GET',
      url: `/api/app/operation/by-patient-treatmen-process/${ptpId}`,
    },
    { apiName: this.apiName });
  

  sendToPricingById = (id: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/operation/${id}/send-to-pricing`,
    },
    { apiName: this.apiName });
  

  update = (id: number, operation: SaveOperationDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/operation/${id}`,
      body: operation,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
