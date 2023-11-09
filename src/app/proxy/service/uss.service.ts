import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ExternalApiResult } from '../dto/external/models';

@Injectable({
  providedIn: 'root',
})
export class USSService {
  apiName = 'Default';
  

  getSysTrackingNumberByTreatmentCode = (treatmentCode: string) =>
    this.restService.request<any, ExternalApiResult>({
      method: 'GET',
      url: '/api/app/u-sS/sys-tracking-number',
      params: { treatmentCode },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
