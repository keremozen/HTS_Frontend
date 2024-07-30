import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { FinalizePtpDto, PatientTreatmentProcessDetailedDto, PatientTreatmentProcessDto } from '../dto/patient-treatment-process/models';

@Injectable({
  providedIn: 'root',
})
export class PatientTreatmentProcessService {
  apiName = 'Default';
  

  deFinalize = (id: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/patient-treatment-process/${id}/de-finalize`,
    },
    { apiName: this.apiName });
  

  finalize = (id: number, finalizePtp: FinalizePtpDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/patient-treatment-process/${id}/finalize`,
      body: finalizePtp,
    },
    { apiName: this.apiName });
  

  getByPatientTreatmentProcessId = (patientTreatmentProcessId: number) =>
    this.restService.request<any, PatientTreatmentProcessDto>({
      method: 'GET',
      url: `/api/app/patient-treatment-process/by-patient-treatment-process-id/${patientTreatmentProcessId}`,
    },
    { apiName: this.apiName });
  

  getListByPatientId = (patientId: number) =>
    this.restService.request<any, PagedResultDto<PatientTreatmentProcessDetailedDto>>({
      method: 'GET',
      url: `/api/app/patient-treatment-process/by-patient-id/${patientId}`,
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
