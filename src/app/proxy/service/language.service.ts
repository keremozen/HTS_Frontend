import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LanguageDto, SaveLanguageDto } from '../dto/language/models';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  apiName = 'Default';
  

  create = (language: SaveLanguageDto) =>
    this.restService.request<any, LanguageDto>({
      method: 'POST',
      url: '/api/app/language',
      body: language,
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
  

  getList = (isActive?: boolean) =>
    this.restService.request<any, PagedResultDto<LanguageDto>>({
      method: 'GET',
      url: '/api/app/language',
      params: { isActive },
    },
    { apiName: this.apiName });
  

  update = (id: number, language: SaveLanguageDto) =>
    this.restService.request<any, LanguageDto>({
      method: 'PUT',
      url: `/api/app/language/${id}`,
      body: language,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
