import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TreatmentProcessStatusDto } from '../dto/treatment-process-status/models';

@Injectable({
  providedIn: 'root',
})
export class TreatmentProcessStatusService {
  apiName = 'Default';
  

  getList = () =>
    this.restService.request<any, ListResultDto<TreatmentProcessStatusDto>>({
      method: 'GET',
      url: '/api/app/treatment-process-status',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
