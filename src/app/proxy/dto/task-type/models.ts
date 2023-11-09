import type { EntityDto } from '@abp/ng.core';

export interface TaskTypeDto extends EntityDto<number> {
  name?: string;
}
