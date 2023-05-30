import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CurrencyDto } from '../dto/currency/models';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  apiName = 'Default';
  

  getList = () =>
    this.restService.request<any, ListResultDto<CurrencyDto>>({
      method: 'GET',
      url: '/api/app/currency',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
