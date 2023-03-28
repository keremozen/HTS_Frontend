import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface PatientDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  name?: string;
  surname?: string;
  passportNumber?: string;
  birthDate?: Date;
  isActive: boolean;
  phoneNumber?: string;
  email?: string;
  phoneCountryCodeId?: number;
  nationalityId: number;
  genderId?: number;
  motherTongueId?: number;
  secondTongueId?: number;
}

export interface SavePatientDto {
  name: string;
  surname: string;
  passportNumber?: string;
  birthDate?: Date;
  phoneNumber?: string;
  email?: string;
  phoneCountryCodeId?: number;
  nationalityId: number;
  genderId?: number;
  motherTongueId?: number;
  secondTongueId?: number;
}
