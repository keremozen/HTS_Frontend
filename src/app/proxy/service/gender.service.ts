import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GenderDto } from '../dto/models';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  apiName = 'Default';
  

  getList = () =>
    this.restService.request<any, ListResultDto<GenderDto>>({
      method: 'GET',
      url: '/api/app/gender',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
