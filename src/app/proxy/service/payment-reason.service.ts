import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PaymentReasonDto, SavePaymentReasonDto } from '../dto/payment-reason/models';

@Injectable({
  providedIn: 'root',
})
export class PaymentReasonService {
  apiName = 'Default';
  

  create = (paymentReason: SavePaymentReasonDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/payment-reason',
      body: paymentReason,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/payment-reason/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, PaymentReasonDto>({
      method: 'GET',
      url: `/api/app/payment-reason/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, ListResultDto<PaymentReasonDto>>({
      method: 'GET',
      url: '/api/app/payment-reason',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, paymentReason: SavePaymentReasonDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/payment-reason/${id}`,
      body: paymentReason,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
