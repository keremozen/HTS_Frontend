import type { EntityDto } from '@abp/ng.core';

export interface TreatmentProcessStatusDto extends EntityDto<number> {
  name?: string;
}
