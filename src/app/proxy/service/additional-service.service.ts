import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AdditionalServiceDto } from '../dto/additional-service/models';

@Injectable({
  providedIn: 'root',
})
export class AdditionalServiceService {
  apiName = 'Default';
  

  getList = () =>
    this.restService.request<any, ListResultDto<AdditionalServiceDto>>({
      method: 'GET',
      url: '/api/app/additional-service',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
