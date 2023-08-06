import type { EntityDto } from '@abp/ng.core';
import type { EntityEnum_ProcessTypeEnum } from '../../enum/entity-enum-process-type-enum.enum';
import type { ProcessTypeDto } from '../process-type/models';
import type { ProcessKindDto } from '../process-kind/models';
import type { ProcessCostDto, SaveProcessCostDto } from '../process-cost/models';
import type { ProcessRelationDto, SaveProcessRelationDto } from '../process-relation/models';

export interface ProcessDto extends EntityDto<number> {
  name?: string;
  englishName?: string;
  code?: string;
  description?: string;
  processTypeId: EntityEnum_ProcessTypeEnum;
  processKindId?: number;
  isActive: boolean;
  processType: ProcessTypeDto;
  processKind: ProcessKindDto;
  processCosts: ProcessCostDto[];
  processRelations: ProcessRelationDto[];
}

export interface SaveProcessDto {
  name: string;
  englishName: string;
  code: string;
  description?: string;
  processTypeId: number;
  processKindId?: number;
  isActive: boolean;
  processCosts: SaveProcessCostDto[];
  processRelations: SaveProcessRelationDto[];
}
