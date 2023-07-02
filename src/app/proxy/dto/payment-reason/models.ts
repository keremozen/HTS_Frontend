import type { EntityDto } from '@abp/ng.core';

export interface PaymentReasonDto extends EntityDto<number> {
  name?: string;
  isActive: boolean;
}

export interface SavePaymentReasonDto {
  name: string;
  isActive: boolean;
}
