import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ExternalApiResult, SutCodesRequestDto } from '../dto/external/models';

@Injectable({
  providedIn: 'root',
})
export class ExternalService {
  apiName = 'Default';
  

  checkSutCodesBySutCodesRequest = (sutCodesRequest: SutCodesRequestDto) =>
    this.restService.request<any, ExternalApiResult>({
      method: 'POST',
      url: '/api/app/external/check-sut-codes',
      body: sutCodesRequest,
    },
    { apiName: this.apiName });
  

  getPatientInfoByHtsCode = (htsCode: string) =>
    this.restService.request<any, ExternalApiResult>({
      method: 'GET',
      url: '/api/app/external/patient-info',
      params: { htsCode },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
