import type { EntityDto } from '@abp/ng.core';

export interface LanguageDto extends EntityDto<number> {
  name?: string;
  code?: string;
  description?: string;
  isActive: boolean;
}

export interface SaveLanguageDto {
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
}
