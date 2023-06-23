import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ExchangeRateInformationDto } from '../dto/exchange-rate-information/models';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateInformationService {
  apiName = 'Default';
  

  get = (currencyId: number) =>
    this.restService.request<any, ExchangeRateInformationDto>({
      method: 'GET',
      url: '/api/app/exchange-rate-information',
      params: { currencyId },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
