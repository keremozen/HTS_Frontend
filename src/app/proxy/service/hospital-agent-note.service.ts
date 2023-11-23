import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { HospitalAgentNoteDto, SaveHospitalAgentNoteDto } from '../dto/hospital-agent-note/models';

@Injectable({
  providedIn: 'root',
})
export class HospitalAgentNoteService {
  apiName = 'Default';
  

  create = (agentNote: SaveHospitalAgentNoteDto) =>
    this.restService.request<any, HospitalAgentNoteDto>({
      method: 'POST',
      url: '/api/app/hospital-agent-note',
      body: agentNote,
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/hospital-agent-note/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (hospitalResponseId: number) =>
    this.restService.request<any, PagedResultDto<HospitalAgentNoteDto>>({
      method: 'GET',
      url: '/api/app/hospital-agent-note',
      params: { hospitalResponseId },
    },
    { apiName: this.apiName });
  

  updateStatusByIdAndStatusId = (id: number, statusId: number) =>
    this.restService.request<any, HospitalAgentNoteDto>({
      method: 'PUT',
      url: `/api/app/hospital-agent-note/${id}/status/${statusId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
