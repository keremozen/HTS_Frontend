import type { EntityDto } from '@abp/ng.core';

export interface ContractedInstitutionDto extends EntityDto<number> {
  name?: string;
  description?: string;
  isActive: boolean;
}

export interface SaveContractedInstitutionDto {
  name: string;
  description?: string;
  isActive: boolean;
}
