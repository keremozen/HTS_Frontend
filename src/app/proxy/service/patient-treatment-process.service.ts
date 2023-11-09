import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PatientTreatmentProcessDto } from '../dto/patient-treatment-process/models';

@Injectable({
  providedIn: 'root',
})
export class PatientTreatmentProcessService {
  apiName = 'Default';
  

  getListByPatientId = (patientId: number) =>
    this.restService.request<any, PagedResultDto<PatientTreatmentProcessDto>>({
      method: 'GET',
      url: `/api/app/patient-treatment-process/by-patient-id/${patientId}`,
    },
    { apiName: this.apiName });
  

  setSysTrackingNumberByTreatmentCode = (treatmentCode: string) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/patient-treatment-process/set-sys-tracking-number',
      params: { treatmentCode },
    },
    { apiName: this.apiName });
  

  start = (patientId: number) =>
    this.restService.request<any, PatientTreatmentProcessDto>({
      method: 'POST',
      url: `/api/app/patient-treatment-process/start/${patientId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
