import type { EntityDto } from '@abp/ng.core';
import type { BranchDto } from '../branch/models';

export interface SMCIInterpreterAppointmentDto extends EntityDto<number> {
  salesMethodAndCompanionInfoId: number;
  appointmentDate?: Date;
  description?: Date;
  branchId?: number;
  branch: BranchDto;
}

export interface SaveSMCIInterpreterAppointmentDto extends EntityDto<number> {
  salesMethodAndCompanionInfoId: number;
  appointmentDate?: Date;
  description?: Date;
  branchId?: number;
}
