import type { EntityDto } from '@abp/ng.core';

export interface OperationStatusDto extends EntityDto<number> {
  name?: string;
}
