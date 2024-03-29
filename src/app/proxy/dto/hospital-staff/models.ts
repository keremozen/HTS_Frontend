import type { EntityDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';

export interface HospitalStaffDto extends EntityDto<number> {
  user: IdentityUserDto;
  userId?: string;
  hospitalId: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface SaveHospitalStaffDto {
  userId: string;
  hospitalId: number;
  isDefault: boolean;
  isActive: boolean;
}
