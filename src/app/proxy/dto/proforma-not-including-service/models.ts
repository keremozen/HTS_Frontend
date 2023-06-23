import type { EntityDto } from '@abp/ng.core';

export interface ProformaNotIncludingServiceDto extends EntityDto<number> {
  description?: string;
}

export interface SaveProformaNotIncludingServiceDto {
  proformaId: number;
  description: string;
}
