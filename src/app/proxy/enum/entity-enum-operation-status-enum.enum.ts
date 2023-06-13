import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_OperationStatusEnum {
  PriceExpecting = 1,
  ProformaCreated = 2,
}

export const entityEnum_OperationStatusEnumOptions = mapEnumToOptions(EntityEnum_OperationStatusEnum);
