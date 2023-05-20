import type { EntityDto } from '@abp/ng.core';

export interface MaterialDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SaveMaterialDto {
  name: string;
  isActive: boolean;
}
