import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ExternalApiResult, ListENabizProcessDto } from '../dto/external/models';

@Injectable({
  providedIn: 'root',
})
export class USSService {
  apiName = 'Default';
  

  getENabizProcessesByTreatmentCode = (treatmentCode: string) =>
    this.restService.request<any, ListENabizProcessDto[]>({
      method: 'GET',
      url: '/api/app/u-sS/e-nabiz-processes',
      params: { treatmentCode },
    },
    { apiName: this.apiName });
  

  getSysTrackingNumberByTreatmentCode = (treatmentCode: string) =>
    this.restService.request<any, ExternalApiResult>({
      method: 'GET',
      url: '/api/app/u-sS/sys-tracking-number',
      params: { treatmentCode },
    },
    { apiName: this.apiName });
  

  getSysTrackingNumberDetailBySysTrackingNumberAndTreatmentCode = (sysTrackingNumber: string, treatmentCode: string) =>
    this.restService.request<any, ExternalApiResult>({
      method: 'GET',
      url: '/api/app/u-sS/sys-tracking-number-detail',
      params: { sysTrackingNumber, treatmentCode },
    },
    { apiName: this.apiName });
  

  setENabizProcessByTreatmentCode = (treatmentCode: string) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/u-sS/set-eNabiz-process',
      params: { treatmentCode },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
