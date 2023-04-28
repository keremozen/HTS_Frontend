import type { EntityDto } from '@abp/ng.core';

export interface HospitalResponseDto extends EntityDto<number> {
  response?: string;
  isAssessable: boolean;
  isActive: boolean;
}

export interface SaveHospitalResponseDto {
  response: string;
  isAssessable: boolean;
  isActive: boolean;
}
