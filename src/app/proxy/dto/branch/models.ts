import type { EntityDto } from '@abp/ng.core';

export interface BranchDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SaveBranchDto {
  name: string;
  isActive: boolean;
}
