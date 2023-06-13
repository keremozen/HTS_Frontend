import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_ProcessTypeEnum {
  SutCode = 1,
  Material = 2,
}

export const entityEnum_ProcessTypeEnumOptions = mapEnumToOptions(EntityEnum_ProcessTypeEnum);
