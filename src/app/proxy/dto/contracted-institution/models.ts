import type { EntityDto } from '@abp/ng.core';
import type { NationalityDto } from '../nationality/models';

export interface ContractedInstitutionDto extends EntityDto<number> {
  name?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  phoneCountryCodeId: number;
  nationalityId: number;
  site?: string;
  address?: string;
  isActive: boolean;
  phoneCountryCode: NationalityDto;
  nationality: NationalityDto;
}

export interface SaveContractedInstitutionDto {
  name: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  phoneCountryCodeId: number;
  nationalityId: number;
  site?: string;
  address?: string;
  isActive: boolean;
}
