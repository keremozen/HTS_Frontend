import type { EntityDto } from '@abp/ng.core';

export interface ProcessKindDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SaveProcessKindDto {
  name: string;
  isActive: boolean;
}
