import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { EntityEnum_PatientTreatmentStatusEnum } from '../../enum/entity-enum-patient-treatment-status-enum.enum';
import type { TreatmentProcessStatusDto } from '../treatment-process-status/models';
import type { HospitalConsultationDto } from '../hospital-consultation/models';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface PatientTreatmentProcessDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  treatmentCode?: string;
  isFinalized: boolean;
  treatmentProcessStatusId: EntityEnum_PatientTreatmentStatusEnum;
  treatmentProcessStatus: TreatmentProcessStatusDto;
  patientNameSurname?: string;
  hospitalConsultations: HospitalConsultationDto[];
}

export interface FinalizePtpDto {
  finalizationTypeId: number;
  description: string;
}

export interface PatientTreatmentProcessDetailedDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  treatmentCode?: string;
  hbysPrice: number;
  proformaPrice: number;
  paymentPrice: number;
  unPaidPrice: number;
  isFinalized: boolean;
  finalizationTypeId?: number;
  finalizationDescription?: string;
  treatmentProcessStatusId: EntityEnum_PatientTreatmentStatusEnum;
  treatmentProcessStatus: TreatmentProcessStatusDto;
  hospitalConsultations: HospitalConsultationDto[];
}
