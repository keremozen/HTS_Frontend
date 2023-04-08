import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { EntityEnum_PatientTreatmentStatusEnum } from '../../enum/entity-enum-patient-treatment-status-enum.enum';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface PatientTreatmentProcessDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  treatmentCode?: string;
  treatmentProcessStatusId: EntityEnum_PatientTreatmentStatusEnum;
}
