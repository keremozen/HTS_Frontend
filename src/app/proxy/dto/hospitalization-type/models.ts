import type { EntityDto } from '@abp/ng.core';

export interface HospitalizationTypeDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SaveHospitalizationTypeDto {
  name: string;
  isActive: boolean;
}
