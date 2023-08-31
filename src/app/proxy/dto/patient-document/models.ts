import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { DocumentTypeDto } from '../document-type/models';
import type { EntityEnum_PatientDocumentStatusEnum } from '../../enum/entity-enum-patient-document-status-enum.enum';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface PatientDocumentDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  description?: string;
  fileName?: string;
  patientId: number;
  file?: string;
  contentType?: string;
  documentType: DocumentTypeDto;
  patientDocumentStatusId: EntityEnum_PatientDocumentStatusEnum;
}

export interface SavePatientDocumentDto {
  patientId: number;
  documentTypeId?: number;
  description?: string;
  fileName: string;
  file: string;
  contentType: string;
}
