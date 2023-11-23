import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { EntityEnum_HospitalAgentNoteStatusEnum } from '../../enum/entity-enum-hospital-agent-note-status-enum.enum';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface HospitalAgentNoteDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  note?: string;
  hospitalResponseId: number;
  statusId: EntityEnum_HospitalAgentNoteStatusEnum;
}

export interface SaveHospitalAgentNoteDto {
  note: string;
  hospitalResponseId: number;
  statusId: EntityEnum_HospitalAgentNoteStatusEnum;
}
