import type { EntityDto } from '@abp/ng.core';
import type { NationalityDto } from '../nationality/models';
import type { ContractedInstitutionKindDto } from '../contracted-institution-kind/models';
import type { ContractedInstitutionTypeDto } from '../contracted-institution-type/models';
import type { ContractedInstitutionStaffDto } from '../contracted-institution-staff/models';

export interface ContractedInstitutionDto extends EntityDto<number> {
  name?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  phoneCountryCodeId: number;
  nationalityId: number;
  site?: string;
  address?: string;
  typeId: number;
  kindId: number;
  isActive: boolean;
  phoneCountryCode: NationalityDto;
  nationality: NationalityDto;
  kind: ContractedInstitutionKindDto;
  type: ContractedInstitutionTypeDto;
  contractedInstitutionStaffs: ContractedInstitutionStaffDto[];
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
  typeId: number;
  kindId: number;
  isActive: boolean;
}
