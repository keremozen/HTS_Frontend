import type { EntityDto } from '@abp/ng.core';

export interface PaymentKindDto extends EntityDto<number> {
  name?: string;
}
