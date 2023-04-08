import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { NationalityDto } from '../nationality/models';
import type { GenderDto } from '../gender/models';
import type { LanguageDto } from '../language/models';
import type { PatientTreatmentProcessDto } from '../patient-treatment-process/models';
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
  phoneCountryCode: NationalityDto;
  nationality: NationalityDto;
  gender: GenderDto;
  secondTongue: LanguageDto;
  motherTongue: LanguageDto;
  patientTreatmentProcess: PatientTreatmentProcessDto;
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
