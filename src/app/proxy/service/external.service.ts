import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ExternalApiResult, SutCodesRequestDto } from '../dto/external/models';

@Injectable({
  providedIn: 'root',
})
export class ExternalService {
  apiName = 'Default';
  

  htsHastaBilgisiByHtsCode = (htsCode: string) =>
    this.restService.request<any, ExternalApiResult>({
      method: 'POST',
      url: '/api/app/external/hts-hasta-bilgisi',
      params: { htsCode },
    },
    { apiName: this.apiName });
  

  htsHizmetKoduKontrolBySutCodesRequest = (sutCodesRequest: SutCodesRequestDto) =>
    this.restService.request<any, ExternalApiResult>({
      method: 'POST',
      url: '/api/app/external/hts-hizmet-kodu-kontrol',
      body: sutCodesRequest,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
