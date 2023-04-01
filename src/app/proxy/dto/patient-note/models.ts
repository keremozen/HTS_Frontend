import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { EntityEnum_PatientNoteStatusEnum } from '../../enum/entity-enum-patient-note-status-enum.enum';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface PatientNoteDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  note?: string;
  patientId: number;
  patientNoteStatusId: EntityEnum_PatientNoteStatusEnum;
}

export interface SavePatientNoteDto {
  note: string;
  patientId: number;
}
