import type { EntityDto } from '@abp/ng.core';

export interface SalesMethodAndCompanionInfoDto extends EntityDto<number> {
  companionNameSurname?: string;
  companionEmail?: string;
  companionPhoneNumber?: string;
  companionRelationship?: string;
  companionPassportNumber?: string;
  patientTreatmentProcessId: number;
  patientAdmissionMethodId?: number;
  contractedInstitutionId?: number;
  contractedInstitutionStaffId?: number;
  phoneCountryCodeId?: number;
  companionNationalityId?: number;
}

export interface SaveSalesMethodAndCompanionInfoDto {
  companionNameSurname?: string;
  companionEmail?: string;
  companionPhoneNumber?: string;
  companionRelationship?: string;
  companionPassportNumber?: string;
  patientTreatmentProcessId: number;
  patientAdmissionMethodId?: number;
  contractedInstitutionId?: number;
  contractedInstitutionStaffId?: number;
  phoneCountryCodeId?: number;
  companionNationalityId?: number;
}
