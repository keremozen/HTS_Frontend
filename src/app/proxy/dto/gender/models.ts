import type { EntityDto } from '@abp/ng.core';

export interface GenderDto extends EntityDto<number> {
  name?: string;
}
