import type { EntityDto } from '@abp/ng.core';

export interface CityDto extends EntityDto<number> {
  name?: string;
}

export interface SaveCityDto {
  name: string;
}
