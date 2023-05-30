import type { EntityDto } from '@abp/ng.core';

export interface CurrencyDto extends EntityDto<number> {
  name?: string;
}
