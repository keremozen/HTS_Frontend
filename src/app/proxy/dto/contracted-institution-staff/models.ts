import type { EntityDto } from '@abp/ng.core';
import type { NationalityDto } from '../nationality/models';

export interface ContractedInstitutionStaffDto extends EntityDto<number> {
  nameSurname?: string;
  phoneNumber?: string;
  email?: string;
  contractedInstitutionId: number;
  phoneCountryCodeId?: number;
  isDefault: boolean;
  isActive: boolean;
  phoneCountryCode: NationalityDto;
}

export interface SaveContractedInstitutionStaffDto {
  nameSurname: string;
  phoneNumber?: string;
  email?: string;
  contractedInstitutionId: number;
  phoneCountryCodeId?: number;
  isActive: boolean;
  isDefault: boolean;
}
