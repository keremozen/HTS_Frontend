import type { EntityDto } from '@abp/ng.core';

export interface PaymentDocumentDto extends EntityDto<number> {
  paymentId: number;
  fileName?: string;
  file?: string;
  contentType?: string;
}

export interface SavePaymentDocumentDto {
  paymentId: number;
  fileName: string;
  file: string;
  contentType: string;
}
