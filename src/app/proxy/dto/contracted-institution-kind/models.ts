import type { EntityDto } from '@abp/ng.core';

export interface ContractedInstitutionKindDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SaveContractedInstitutionKindDto {
  name: string;
  isActive: boolean;
}
