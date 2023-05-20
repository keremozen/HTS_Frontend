import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalConsultationDocumentDto } from '../dto/hospital-consultation-document/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalConsultationDocumentService {
  apiName = 'Default';
  

  forwardDocuments = (patientId: number) =>
    this.restService.request<any, PagedResultDto<HospitalConsultationDocumentDto>>({
      method: 'POST',
      url: `/api/app/hospital-consultation-document/forward-documents/${patientId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
