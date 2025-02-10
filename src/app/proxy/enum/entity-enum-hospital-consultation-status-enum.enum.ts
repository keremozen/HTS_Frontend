import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_HospitalConsultationStatusEnum {
  HospitalResponseWaiting = 1,
  SuitableForTreatment = 2,
  NotSuitableForTreatment = 3,
  ExaminationsIsRequiredForDiagnosis = 4,
  OperationApproved = 5,
  OperationRejected = 6,
  AdditionalInfoWaiting = 7,
}

export const entityEnum_HospitalConsultationStatusEnumOptions = mapEnumToOptions(EntityEnum_HospitalConsultationStatusEnum);
