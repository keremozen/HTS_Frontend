import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_HospitalConsultationStatusEnum {
  HospitalResponseWaiting = 1,
  OperationApproved = 2,
  OperationRejected = 3,
}

export const entityEnum_HospitalConsultationStatusEnumOptions = mapEnumToOptions(EntityEnum_HospitalConsultationStatusEnum);
