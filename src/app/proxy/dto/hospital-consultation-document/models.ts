import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { DocumentTypeDto } from '../document-type/models';
import type { EntityEnum_PatientDocumentStatusEnum } from '../../enum/entity-enum-patient-document-status-enum.enum';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface HospitalConsultationDocumentDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  hospitalConsultationId: number;
  documentTypeId?: number;
  patientDocumentStatusId: number;
  description?: string;
  fileName?: string;
  file?: string;
  contentType?: string;
  documentType: DocumentTypeDto;
  patientDocumentStatus: EntityEnum_PatientDocumentStatusEnum;
}

export interface SaveHospitalConsultationDocumentDto {
  documentTypeId?: number;
  patientDocumentStatusId: number;
  description?: string;
  fileName: string;
  file: string;
  contentType: string;
}
