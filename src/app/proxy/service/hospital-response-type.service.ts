import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalResponseTypeDto } from '../dto/hospital-response-type/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalResponseTypeService {
  apiName = 'Default';
  

  getList = () =>
    this.restService.request<any, ListResultDto<HospitalResponseTypeDto>>({
      method: 'GET',
      url: '/api/app/hospital-response-type',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
