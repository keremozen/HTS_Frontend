import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TreatmentTypeDto } from '../dto/treatment-type/models';

@Injectable({
  providedIn: 'root',
})
export class TreatmentTypeService {
  apiName = 'Default';
  

  get = (id: number) =>
    this.restService.request<any, TreatmentTypeDto>({
      method: 'GET',
      url: `/api/app/treatment-type/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<TreatmentTypeDto>>({
      method: 'GET',
      url: '/api/app/treatment-type',
      params: { isActive },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
