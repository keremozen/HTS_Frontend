import type { EntityDto } from '@abp/ng.core';

export interface ProcessCostDto extends EntityDto<number> {
  processId: number;
  validityStartDate?: Date;
  validityEndDate?: Date;
  hospitalPrice: number;
  ushasPrice: number;
  isActive: boolean;
}

export interface SaveProcessCostDto {
  processId: number;
  validityStartDate: Date;
  validityEndDate: Date;
  hospitalPrice: number;
  ushasPrice: number;
  isActive: boolean;
}
