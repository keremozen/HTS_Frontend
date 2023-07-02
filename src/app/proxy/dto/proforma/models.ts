import type { AuditedEntityWithUserDto, EntityDto } from '@abp/ng.core';
import type { EntityEnum_ProformaStatusEnum } from '../../enum/entity-enum-proforma-status-enum.enum';
import type { RejectReasonDto } from '../reject-reason/models';
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
  rejectReasonId?: number;
  rejectReasonMFB?: string;
  sendToPatientManually?: boolean;
  rejectReason: RejectReasonDto;
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

export interface ProformaPricingListDto extends AuditedEntityWithUserDto<number, IdentityUserDto> {
  operationId: number;
  proformaStatusId: EntityEnum_ProformaStatusEnum;
  proformaCode?: string;
  creationDate?: Date;
  version: number;
  rejectReasonId?: number;
  rejectReasonMFB?: string;
  rejectReason: RejectReasonDto;
  proformaStatus: ProformaStatusDto;
}

export interface ProformaStatusDto extends EntityDto<number> {
  name?: string;
}

export interface RejectProformaDto {
  id: number;
  rejectReasonId?: number;
  rejectReason?: string;
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
  proformaProcesses: SaveProformaProcessDto[];
  proformaAdditionalServices: SaveProformaAdditionalServiceDto[];
  proformaNotIncludingServices: SaveProformaNotIncludingServiceDto[];
}
