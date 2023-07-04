import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PaymentDto, SavePaymentDto } from '../dto/payment/models';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiName = 'Default';
  

  create = (payment: SavePaymentDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/payment',
      body: payment,
    },
    { apiName: this.apiName });
  

  getList = (ptpId: number) =>
    this.restService.request<any, PagedResultDto<PaymentDto>>({
      method: 'GET',
      url: '/api/app/payment',
      params: { ptpId },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
