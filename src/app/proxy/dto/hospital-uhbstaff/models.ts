import type { EntityDto } from '@abp/ng.core';

export interface HospitalUHBStaffDto extends EntityDto<number> {
  hospitalId: number;
  name?: string;
  surname?: string;
  email?: string;
}

export interface SaveHospitalUHBStaffDto {
  hospitalId: number;
  name: string;
  surname: string;
  email: string;
}
