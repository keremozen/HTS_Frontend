import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { DocumentTypeDto } from '../document-type/models';
import type { EntityEnum_PatientDocumentStatusEnum } from '../../enum/entity-enum-patient-document-status-enum.enum';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface PatientDocumentDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  description?: string;
  fileName?: string;
  filePath?: string;
  patientId: number;
  documentType: DocumentTypeDto;
  patientDocumentStatus: EntityEnum_PatientDocumentStatusEnum;
}

export interface SavePatientDocumentDto {
  patientId: number;
  documentTypeId: number;
  patientDocumentStatusId: number;
  description: string;
  fileName: string;
  filePath: string;
}
