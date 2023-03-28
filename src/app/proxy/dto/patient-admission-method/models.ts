import type { EntityDto } from '@abp/ng.core';

export interface PatientAdmissionMethodDto extends EntityDto<number> {
  name?: string;
  description?: string;
  isActive: boolean;
}

export interface SavePatientAdmissionMethodDto {
  name: string;
  description?: string;
  isActive: boolean;
}
