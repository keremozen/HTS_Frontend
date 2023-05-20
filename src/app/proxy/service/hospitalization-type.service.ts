import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalizationTypeDto } from '../dto/hospitalization-type/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalizationTypeService {
  apiName = 'Default';
  

  getList = () =>
    this.restService.request<any, PagedResultDto<HospitalizationTypeDto>>({
      method: 'GET',
      url: '/api/app/hospitalization-type',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
