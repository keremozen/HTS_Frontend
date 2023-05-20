import type { EntityDto } from '@abp/ng.core';

export interface HospitalResponseProcessDto extends EntityDto<number> {
  hospitalResponseId: number;
  processId: number;
  amount: number;
}

export interface SaveHospitalResponseProcessDto {
  hospitalResponseId: number;
  processId: number;
  amount: number;
}
