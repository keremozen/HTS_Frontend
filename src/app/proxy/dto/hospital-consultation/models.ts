import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { EntityEnum_HospitalConsultationStatusEnum } from '../../enum/entity-enum-hospital-consultation-status-enum.enum';
import type { HospitalConsultationStatusDto } from '../hospital-consultation-status/models';
import type { SaveHospitalConsultationDocumentDto } from '../hospital-consultation-document/models';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface HospitalConsultationDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  note?: string;
  patientTreatmentProcessId: number;
  hospitalId: number;
  hospitalConsultationStatusId: EntityEnum_HospitalConsultationStatusEnum;
  hospitalConsultationStatus: HospitalConsultationStatusDto;
}

export interface SaveHospitalConsultationDto {
  note: string;
  patientTreatmentProcessId: number;
  hospitalIds: number[];
  hospitalConsultationDocuments: SaveHospitalConsultationDocumentDto[];
}
