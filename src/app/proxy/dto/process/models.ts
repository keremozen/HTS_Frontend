import type { EntityDto } from '@abp/ng.core';
import type { ProcessTypeDto } from '../process-type/models';
import type { ProcessCostDto, SaveProcessCostDto } from '../process-cost/models';
import type { ProcessRelationDto, SaveProcessRelationDto } from '../process-relation/models';

export interface ProcessDto extends EntityDto<number> {
  name?: string;
  englishName?: string;
  code?: string;
  description?: string;
  processTypeId: number;
  isActive: boolean;
  processType: ProcessTypeDto;
  processCosts: ProcessCostDto[];
  processRelations: ProcessRelationDto[];
}

export interface SaveProcessDto {
  name: string;
  englishName: string;
  code: string;
  description?: string;
  processTypeId: number;
  isActive: boolean;
  processCosts: SaveProcessCostDto[];
  processRelations: SaveProcessRelationDto[];
}
