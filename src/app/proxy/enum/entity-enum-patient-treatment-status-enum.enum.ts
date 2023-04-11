import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_PatientTreatmentStatusEnum {
  NewRecord = 1,
  HospitalAsked = 2,
  AssessmentWaiting = 3,
  QuotationWaiting = 4,
  Discharged = 5,
}

export const entityEnum_PatientTreatmentStatusEnumOptions = mapEnumToOptions(EntityEnum_PatientTreatmentStatusEnum);
