import type { EntityDto } from '@abp/ng.core';

export interface HospitalResponseBranchDto extends EntityDto<number> {
  hospitalResponseId: number;
  branchId: number;
}

export interface SaveHospitalResponseBranchDto {
  hospitalResponseId: number;
  branchId: number;
}
