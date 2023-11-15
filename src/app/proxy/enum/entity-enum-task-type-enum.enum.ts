import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_TaskTypeEnum {
  Pricing = 1,
  PatientApproval = 2,
  Tik = 3,
}

export const entityEnum_TaskTypeEnumOptions = mapEnumToOptions(EntityEnum_TaskTypeEnum);
