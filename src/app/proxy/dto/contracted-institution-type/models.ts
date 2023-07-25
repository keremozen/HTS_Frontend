import type { EntityDto } from '@abp/ng.core';

export interface ContractedInstitutionTypeDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SaveContractedInstitutionTypeDto {
  name: string;
  isActive: boolean;
}
