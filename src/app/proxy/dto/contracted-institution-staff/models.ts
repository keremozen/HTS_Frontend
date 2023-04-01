import type { EntityDto } from '@abp/ng.core';

export interface ContractedInstitutionStaffDto extends EntityDto<number> {
  nameSurname?: string;
  phoneNumber?: string;
  email?: string;
  contractedInstitutionId: number;
  phoneCountryCodeId: number;
  isActive: boolean;
}

export interface SaveContractedInstitutionStaffDto {
  nameSurname: string;
  phoneNumber: string;
  email?: string;
  contractedInstitutionId: number;
  phoneCountryCodeId: number;
  isActive: boolean;
}
