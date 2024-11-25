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
  

  get = (id: number) =>
    this.restService.request<any, SaveDocumentDto>({
      method: 'GET',
      url: `/api/app/invitation-letter-document/${id}`,
    },
    { apiName: this.apiName });
  

  getByPatient = (patientId: number) =>
    this.restService.request<any, SaveDocumentDto[]>({
      method: 'GET',
      url: `/api/app/invitation-letter-document/by-patient/${patientId}`,
    },
    { apiName: this.apiName });
  

  sendEMailToPatientBySalesMethodId = (salesMethodId: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/invitation-letter-document/send-eMail-to-patient/${salesMethodId}`,
    },
    { apiName: this.apiName });
  

  updateStatusByIdAndStatusId = (id: number, statusId: number) =>
    this.restService.request<any, SaveDocumentDto>({
      method: 'PUT',
      url: `/api/app/invitation-letter-document/${id}/status/${statusId}`,
    },
    { apiName: this.apiName });
  

  upload = (documents: SaveDocumentDto[]) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/invitation-letter-document/upload',
      body: documents,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
