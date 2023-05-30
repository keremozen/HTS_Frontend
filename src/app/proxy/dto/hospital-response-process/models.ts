import type { EntityDto } from '@abp/ng.core';
import type { ProcessDto } from '../process/models';

export interface HospitalResponseProcessDto extends EntityDto<number> {
  hospitalResponseId: number;
  processId: number;
  amount: number;
  process: ProcessDto;
}

export interface SaveHospitalResponseProcessDto {
  hospitalResponseId: number;
  processId: number;
  amount: number;
}
