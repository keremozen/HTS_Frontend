import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProcessTypeDto } from '../dto/process-type/models';

@Injectable({
  providedIn: 'root',
})
export class ProcessTypeService {
  apiName = 'Default';
  

  get = (id: number) =>
    this.restService.request<any, ProcessTypeDto>({
      method: 'GET',
      url: `/api/app/process-type/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<ProcessTypeDto>>({
      method: 'GET',
      url: '/api/app/process-type',
      params: { isActive },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
