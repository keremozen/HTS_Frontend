import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HTSTaskDto, SaveHTSTaskDto } from '../dto/htstask/models';

@Injectable({
  providedIn: 'root',
})
export class HTSTaskService {
  apiName = 'Default';
  

  assignToTikByUserId = (userId: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/h-tSTask/assign-to-tik/${userId}`,
    },
    { apiName: this.apiName });
  

  create = (saveTask: SaveHTSTaskDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/h-tSTask',
      body: saveTask,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, PagedResultDto<HTSTaskDto>>({
      method: 'GET',
      url: '/api/app/h-tSTask',
    },
    { apiName: this.apiName });
  

  returnFromTikByUserId = (userId: number) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/h-tSTask/return-from-tik/${userId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
