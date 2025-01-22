import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface SaveDocumentDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  salesMethodAndCompanionInfoId: number;
  fileName: string;
  file: string;
  contentType: string;
  description?: string;
  patientDocumentStatusId: number;
}
