import type { EntityDto } from '@abp/ng.core';
import type { IdentityUserDto } from '../../volo/abp/identity/models';

export interface HospitalInterpreterDto extends EntityDto<number> {
  user: IdentityUserDto;
  userId?: string;
  hospitalId: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface SaveHospitalInterpreterDto {
  userId: string;
  hospitalId: number;
  isDefault: boolean;
  isActive: boolean;
}
