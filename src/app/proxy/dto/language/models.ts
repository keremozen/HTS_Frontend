import type { EntityDto } from '@abp/ng.core';

export interface LanguageDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SaveLanguageDto {
  name: string;
  isActive: boolean;
}
