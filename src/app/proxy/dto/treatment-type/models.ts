import type { EntityDto } from '@abp/ng.core';

export interface SaveTreatmentTypeDto {
  name: string;
  isActive: boolean;
}

export interface TreatmentTypeDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}
