import type { EntityDto } from '@abp/ng.core';

export interface DocumentTypeDto extends EntityDto<number> {
  name?: string;
  description?: string;
  isActive: boolean;
}

export interface SaveDocumentTypeDto {
  name: string;
  description?: string;
  isActive: boolean;
}
