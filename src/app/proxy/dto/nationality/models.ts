import type { EntityDto } from '@abp/ng.core';

export interface NationalityDto extends EntityDto<number> {
  name?: string;
  phoneCode?: string;
  isActive: boolean;
}

export interface SaveNationalityDto {
  name: string;
  phoneCode: string;
  isActive: boolean;
}
