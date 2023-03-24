import type { EntityDto } from '@abp/ng.core';

export interface NationalityDto extends EntityDto<number> {
  name?: string;
  code?: string;
  description?: string;
  isActive: boolean;
}

export interface SaveNationalityDto {
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
}
