import type { EntityDto } from '@abp/ng.core';
import type { EntityEnum_AdditionalServiceEnum } from '../../enum/entity-enum-additional-service-enum.enum';
import type { EntityEnum_RoomTypeEnum } from '../../enum/entity-enum-room-type-enum.enum';
import type { AdditionalServiceDto } from '../additional-service/models';

export interface ProformaAdditionalServiceDto extends EntityDto<number> {
  proformaId: number;
  additionalServiceId: EntityEnum_AdditionalServiceEnum;
  dayCount?: number;
  roomTypeId?: EntityEnum_RoomTypeEnum;
  companionCount?: number;
  itemCount?: number;
  additionalService: AdditionalServiceDto;
}

export interface SaveProformaAdditionalServiceDto {
  proformaId: number;
  additionalServiceId: EntityEnum_AdditionalServiceEnum;
  dayCount?: number;
  roomTypeId?: EntityEnum_RoomTypeEnum;
  companionCount?: number;
  itemCount?: number;
}
