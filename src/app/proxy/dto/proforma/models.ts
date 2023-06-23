import type { AuditedEntityWithUserDto } from '@abp/ng.core';
import type { EntityEnum_ProformaStatusEnum } from '../../enum/entity-enum-proforma-status-enum.enum';
import type { CurrencyDto } from '../currency/models';
import type { OperationDto } from '../operation/models';
import type { ProformaProcessDto, SaveProformaProcessDto } from '../proforma-process/models';
import type { ProformaAdditionalServiceDto, SaveProformaAdditionalServiceDto } from '../proforma-additional-service/models';
import type { ProformaNotIncludingServiceDto, SaveProformaNotIncludingServiceDto } from '../proforma-not-including-service/models';
import { IdentityUserDto } from '@abp/ng.identity/proxy';

export interface ProformaDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  operationId: number;
  currencyId: number;
  proformaStatusId: EntityEnum_ProformaStatusEnum;
  exchangeRate: number;
  proformaCode?: string;
  creationDate?: Date;
  description?: string;
  tpDescription?: string;
  version: number;
  totalProformaPrice: number;
  rejectReason?: string;
  currency: CurrencyDto;
  operation: OperationDto;
  proformaProcesses: ProformaProcessDto[];
  proformaAdditionalServices: ProformaAdditionalServiceDto[];
  proformaNotIncludingServices: ProformaNotIncludingServiceDto[];
}

export interface ProformaListDto {
  id: number;
  name?: string;
}

export interface RejectProformaDto {
  id: number;
  rejectReasonId: number;
}

export interface SaveProformaDto {
  operationId: number;
  currencyId: number;
  proformaStatusId: EntityEnum_ProformaStatusEnum;
  exchangeRate: number;
  totalProformaPrice: number;
  proformaCode: string;
  description?: string;
  tpDescription?: string;
  version: number;
  rejectReason?: string;
  proformaProcesses: SaveProformaProcessDto[];
  proformaAdditionalServices: SaveProformaAdditionalServiceDto[];
  proformaNotIncludingServices: SaveProformaNotIncludingServiceDto[];
}
