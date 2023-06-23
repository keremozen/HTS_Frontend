import type { EntityDto } from '@abp/ng.core';
import type { ProcessDto } from '../process/models';

export interface ProformaProcessDto extends EntityDto<number> {
  proformaId: number;
  processId: number;
  treatmentCount: number;
  unitPrice: number;
  totalPrice: number;
  proformaPrice: number;
  change: number;
  proformaFinalPrice: number;
  process: ProcessDto;
}

export interface SaveProformaProcessDto {
  proformaId: number;
  processId: number;
  treatmentCount: number;
  unitPrice: number;
  totalPrice: number;
  proformaPrice: number;
  change: number;
  proformaFinalPrice: number;
}
