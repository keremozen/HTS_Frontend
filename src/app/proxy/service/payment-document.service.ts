import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SavePaymentDocumentDto } from '../dto/payment-document/models';

@Injectable({
  providedIn: 'root',
})
export class PaymentDocumentService {
  apiName = 'Default';
  

  save = (paymentDocument: SavePaymentDocumentDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/payment-document/save',
      body: paymentDocument,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
