import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PaymentKindDto } from '../dto/payment-kind/models';

@Injectable({
  providedIn: 'root',
})
export class PaymentKindService {
  apiName = 'Default';
  

  getList = () =>
    this.restService.request<any, ListResultDto<PaymentKindDto>>({
      method: 'GET',
      url: '/api/app/payment-kind',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
