import type { EntityDto } from '@abp/ng.core';

export interface TreatmentTypeDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}
