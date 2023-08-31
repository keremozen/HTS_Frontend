import type { AuditedEntityWithUserDto, EntityDto } from '@abp/ng.core';
import type { EntityEnum_PaymentStatusEnum } from '../../enum/entity-enum-payment-status-enum.enum';
import type { PaymentReasonDto } from '../payment-reason/models';
import type { HospitalDto } from '../hospital/models';
import type { PaymentItemDto, SavePaymentItemDto } from '../payment-item/models';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface ListPaymentDto extends EntityDto<number> {
  proformaId?: number;
  ptpId: number;
  hospitalId: number;
  rowNumber: number;
  generatedRowNumber?: string;
  patientNameSurname?: string;
  payerNameSurname?: string;
  collectorNameSurname?: string;
  paymentReasonId: number;
  processingNumber?: string;
  fileNumber?: string;
  proformaNumber?: string;
  description?: string;
  paymentDate?: Date;
  paymentStatusId: EntityEnum_PaymentStatusEnum;
  totalPrice: number;
  paymentReason: PaymentReasonDto;
}

export interface PaymentDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  proformaId?: number;
  ptpId: number;
  hospitalId: number;
  rowNumber: number;
  generatedRowNumber?: string;
  patientNameSurname?: string;
  payerNameSurname?: string;
  collectorNameSurname?: string;
  paymentReasonId: number;
  processingNumber?: string;
  fileNumber?: string;
  proformaNumber?: string;
  description?: string;
  paymentDate?: Date;
  paymentStatusId: EntityEnum_PaymentStatusEnum;
  hospital: HospitalDto;
  paymentReason: PaymentReasonDto;
  paymentItems: PaymentItemDto[];
}

export interface SavePaymentDto {
  proformaId?: number;
  ptpId: number;
  hospitalId: number;
  payerNameSurname: string;
  paymentReasonId: number;
  processingNumber?: string;
  fileNumber?: string;
  description?: string;
  paymentItems: SavePaymentItemDto[];
}
