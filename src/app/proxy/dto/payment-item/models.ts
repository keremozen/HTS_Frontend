import type { EntityDto } from '@abp/ng.core';
import type { CurrencyDto } from '../currency/models';
import type { PaymentKindDto } from '../payment-kind/models';

export interface PaymentItemDto extends EntityDto<number> {
  paymentId: number;
  paymentKindId: number;
  posApproveCode?: string;
  bank?: string;
  queryNumber?: string;
  currencyId: number;
  price: number;
  exchangeRate: number;
  currency: CurrencyDto;
  paymentKind: PaymentKindDto;
}

export interface SavePaymentItemDto {
  paymentId: number;
  paymentKindId: number;
  posApproveCode?: string;
  bank?: string;
  queryNumber?: string;
  currencyId: number;
  price: number;
}
