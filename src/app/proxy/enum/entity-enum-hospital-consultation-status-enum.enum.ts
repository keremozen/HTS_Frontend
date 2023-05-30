import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_HospitalConsultationStatusEnum {
  HospitalResponseWaiting = 1,
  SuitableForTreatment = 2,
  OperationApproved = 3,
  OperationRejected = 4,
}

export const entityEnum_HospitalConsultationStatusEnumOptions = mapEnumToOptions(EntityEnum_HospitalConsultationStatusEnum);
