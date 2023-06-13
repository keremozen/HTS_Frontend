import type { EntityDto } from '@abp/ng.core';

export interface OperationTypeDto extends EntityDto<number> {
  name?: string;
}
