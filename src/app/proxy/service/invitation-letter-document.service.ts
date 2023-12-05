import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SaveDocumentDto } from '../dto/invitation-letter-document/models';

@Injectable({
  providedIn: 'root',
})
export class InvitationLetterDocumentService {
  apiName = 'Default';
  

  createInvitationLetterBySalesMethodId = (salesMethodId: number) =>
    this.restService.request<any, number[]>({
      method: 'POST',
      url: `/api/app/invitation-letter-document/invitation-letter/${salesMethodId}`,
    },
    { apiName: this.apiName });
  

  getBySalesInfo = (salesInfoId: number) =>
    this.restService.request<any, SaveDocumentDto>({
      method: 'GET',
      url: `/api/app/invitation-letter-document/by-sales-info/${salesInfoId}`,
    },
    { apiName: this.apiName });
  

  sendEMailToPatientBySalesMethodId = (salesMethodId: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/invitation-letter-document/send-eMail-to-patient/${salesMethodId}`,
    },
    { apiName: this.apiName });
  

  upload = (document: SaveDocumentDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/invitation-letter-document/upload',
      body: document,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
