import type { CreationAuditedEntityDto } from '@abp/ng.core';

export interface ExchangeRateInformationDto extends CreationAuditedEntityDto<number> {
  currencyId: number;
  exchangeRate: number;
}
