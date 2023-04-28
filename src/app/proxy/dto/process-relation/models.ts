import type { EntityDto } from '@abp/ng.core';

export interface ProcessRelationDto extends EntityDto<number> {
  processId: number;
  childProcessId: number;
}

export interface SaveProcessRelationDto {
  processId: number;
  childProcessId: number;
}
