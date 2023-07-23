import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_PaymentStatusEnum {
  NewRecord = 1,
  PaymentCompleted = 2,
}

export const entityEnum_PaymentStatusEnumOptions = mapEnumToOptions(EntityEnum_PaymentStatusEnum);
