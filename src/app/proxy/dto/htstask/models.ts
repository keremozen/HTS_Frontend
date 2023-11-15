import type { EntityDto } from '@abp/ng.core';
import type { TaskTypeDto } from '../task-type/models';
import type { PatientDto } from '../patient/models';
import type { IdentityUserDto } from '../../volo/abp/identity/models';
import type { EntityEnum_TaskTypeEnum } from '../../enum/entity-enum-task-type-enum.enum';

export interface HTSTaskDto extends EntityDto<number> {
  userId?: string;
  patientId: number;
  taskTypeId: number;
  isActive: boolean;
  url?: string;
  relatedEntityId: number;
  taskType: TaskTypeDto;
  patient: PatientDto;
  user: IdentityUserDto;
  creationTime?: Date;
}

export interface SaveHTSTaskDto {
  hospitalId?: number;
  patientId: number;
  taskType: EntityEnum_TaskTypeEnum;
  relatedEntityId: number;
  treatmentCode?: string;
}
