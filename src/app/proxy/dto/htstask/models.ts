import type { EntityDto } from '@abp/ng.core';
import type { TaskTypeDto } from '../task-type/models';
import type { PatientDto } from '../patient/models';
import type { IdentityUserDto } from '../../volo/abp/identity/models';

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
  creationTime: Date;
}

export interface SaveHTSTaskDto {
  hospitalId?: number;
  patientId: number;
  taskTypeId: number;
  relatedEntityId: number;
}
