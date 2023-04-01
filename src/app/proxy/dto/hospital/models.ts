import type { EntityDto } from '@abp/ng.core';

export interface HospitalDto extends EntityDto<number> {
  name?: string;
  phoneNumber?: string;
  phoneCountryCodeId?: number;
  email?: string;
  isActive: boolean;
}

export interface SaveHospitalDto {
  name: string;
  phoneNumber?: string;
  phoneCountryCodeId?: number;
  email?: string;
  isActive: boolean;
}
