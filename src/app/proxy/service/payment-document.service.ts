import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PaymentDocumentDto, SavePaymentDocumentDto } from '../dto/payment-document/models';

@Injectable({
  providedIn: 'root',
})
export class PaymentDocumentService {
  apiName = 'Default';
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/payment-document/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, PaymentDocumentDto>({
      method: 'GET',
      url: `/api/app/payment-document/${id}`,
    },
    { apiName: this.apiName });
  

  save = (paymentDocument: SavePaymentDocumentDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/payment-document/save',
      body: paymentDocument,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
