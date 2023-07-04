import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { HospitalDto } from '../hospital/models';
import type { PaymentReasonDto } from '../payment-reason/models';
import type { PaymentItemDto, SavePaymentItemDto } from '../payment-item/models';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface PaymentDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  proformaId?: number;
  ptpId: number;
  hospitalId: number;
  rowNumber?: string;
  patientNameSurname?: string;
  paidNameSurname?: string;
  processingUserNameSurname?: string;
  paymentReasonId: number;
  processingNumber?: string;
  fileNumber?: string;
  description?: string;
  paymentDate?: Date;
  hospital: HospitalDto;
  paymentReason: PaymentReasonDto;
  paymentItems: PaymentItemDto[];
}

export interface SavePaymentDto {
  proformaId?: number;
  ptpId: number;
  hospitalId: number;
  processingUserNameSurname: string;
  paymentReasonId: number;
  processingNumber?: string;
  fileNumber?: string;
  description?: string;
  paymentItems: SavePaymentItemDto[];
}
