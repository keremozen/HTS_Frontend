import type { EntityDto } from '@abp/ng.core';

export interface NationalityDto extends EntityDto<number> {
  name?: string;
  phoneCode?: string;
  countryCode?: string;
  isActive: boolean;
}

export interface SaveExchangeRateInformationDto {
  currencyId: number;
  exchangeRate: number;
}

export interface SaveNationalityDto {
  name: string;
  phoneCode: string;
  countryCode: string;
  isActive: boolean;
}
