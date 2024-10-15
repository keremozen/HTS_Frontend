import type { EntityDto } from '@abp/ng.core';
import type { SMCIInterpreterAppointmentDto, SaveSMCIInterpreterAppointmentDto } from '../smciinterpreter-appointment/models';

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
  appointedInterpreterId?: string;
  anyInvitationLetter: boolean;
  isDocumentTranslationRequired: boolean;
  advancePaymentRequested: boolean;
  anyTravelPlan: boolean;
  travelDateToTurkey?: Date;
  turkeyDestination?: string;
  travelDescription?: string;
  treatmentDate?: Date;
  interpreterAppointments: SMCIInterpreterAppointmentDto[];
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
  appointedInterpreterId?: string;
  anyInvitationLetter: boolean;
  isDocumentTranslationRequired: boolean;
  advancePaymentRequested: boolean;
  anyTravelPlan: boolean;
  travelDateToTurkey?: Date;
  turkeyDestination?: string;
  travelDescription?: string;
  treatmentDate?: Date;
  interpreterAppointments: SaveSMCIInterpreterAppointmentDto[];
}
