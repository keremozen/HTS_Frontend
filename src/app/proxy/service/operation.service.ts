import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SaveOperationDto } from '../dto/operation/models';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  apiName = 'Default';
  

  create = (operation: SaveOperationDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/operation',
      body: operation,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
