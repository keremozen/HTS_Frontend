import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SalesMethodAndCompanionInfoDto, SaveSalesMethodAndCompanionInfoDto } from '../dto/sales-method-and-companion-info/models';

@Injectable({
  providedIn: 'root',
})
export class SalesMethodAndCompanionInfoService {
  apiName = 'Default';
  

  getByPatientTreatmentProcessId = (ptpId: number) =>
    this.restService.request<any, SalesMethodAndCompanionInfoDto>({
      method: 'GET',
      url: `/api/app/sales-method-and-companion-info/by-patient-treatment-process-id/${ptpId}`,
    },
    { apiName: this.apiName });
  

  save = (salesMethodAndCompanionInfo: SaveSalesMethodAndCompanionInfoDto) =>
    this.restService.request<any, SalesMethodAndCompanionInfoDto>({
      method: 'POST',
      url: '/api/app/sales-method-and-companion-info/save',
      body: salesMethodAndCompanionInfo,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
