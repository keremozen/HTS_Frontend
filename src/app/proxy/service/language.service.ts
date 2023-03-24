import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LanguageDto, SaveLanguageDto } from '../dto/language/models';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  apiName = 'Default';
  

  create = (input: SaveLanguageDto) =>
    this.restService.request<any, LanguageDto>({
      method: 'POST',
      url: '/api/app/language',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/language/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: number) =>
    this.restService.request<any, LanguageDto>({
      method: 'GET',
      url: `/api/app/language/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<LanguageDto>>({
      method: 'GET',
      url: '/api/app/language',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  update = (id: number, input: SaveLanguageDto) =>
    this.restService.request<any, LanguageDto>({
      method: 'PUT',
      url: `/api/app/language/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
