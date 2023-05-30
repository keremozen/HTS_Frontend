import type { EntityDto } from '@abp/ng.core';

export interface AdditionalServiceDto extends EntityDto<number> {
  name?: string;
  day: boolean;
  piece: boolean;
  roomType: boolean;
  companion: boolean;
}
