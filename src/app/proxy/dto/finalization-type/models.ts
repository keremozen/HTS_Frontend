import type { EntityDto } from '@abp/ng.core';

export interface FinalizationTypeDto extends EntityDto<number> {
  name?: string;
}

export interface SaveFinalizationTypeDto {
  name: string;
}
