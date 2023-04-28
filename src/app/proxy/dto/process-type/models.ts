import type { EntityDto } from '@abp/ng.core';

export interface ProcessTypeDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SaveProcessTypeDto {
  name: string;
  isActive: boolean;
}
