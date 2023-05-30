import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_PatientTreatmentStatusEnum {
  NewRecord = 1,
  HospitalAskedWaitingResponse = 2,
  HospitalAskedWaitingAssessment = 3,
  OperationApprovedWaitingPricing = 4,
  Discharged = 5,
}

export const entityEnum_PatientTreatmentStatusEnumOptions = mapEnumToOptions(EntityEnum_PatientTreatmentStatusEnum);
