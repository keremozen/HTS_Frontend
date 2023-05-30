import type { EntityDto } from '@abp/ng.core';

export interface RejectReasonDto extends EntityDto<number> {
  reason?: string;
  isActive: boolean;
}

export interface SaveRejectReasonDto {
  reason: string;
  isActive: boolean;
}
