import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_OperationTypeEnum {
  HospitalConsultation = 1,
  Manual = 2,
}

export const entityEnum_OperationTypeEnumOptions = mapEnumToOptions(EntityEnum_OperationTypeEnum);
