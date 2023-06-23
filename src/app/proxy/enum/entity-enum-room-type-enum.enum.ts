import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_RoomTypeEnum {
  Standart = 1,
  VIP = 2,
}

export const entityEnum_RoomTypeEnumOptions = mapEnumToOptions(EntityEnum_RoomTypeEnum);
