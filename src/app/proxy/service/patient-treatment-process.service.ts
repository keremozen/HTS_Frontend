import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PatientTreatmentProcessDto } from '../dto/patient-treatment-process/models';

@Injectable({
  providedIn: 'root',
})
export class PatientTreatmentProcessService {
  apiName = 'Default';
  

  start = (patientId: number) =>
    this.restService.request<any, PatientTreatmentProcessDto>({
      method: 'POST',
      url: `/api/app/patient-treatment-process/start/${patientId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
