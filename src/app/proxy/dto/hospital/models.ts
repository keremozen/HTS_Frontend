import type { EntityDto } from '@abp/ng.core';
import type { NationalityDto } from '../nationality/models';
import type { CityDto } from '../city/models';
import type { HospitalStaffDto } from '../hospital-staff/models';
import type { HospitalUHBStaffDto } from '../hospital-uhbstaff/models';
import type { HospitalPricerDto } from '../hospital-pricer/models';
import type { HospitalInterpreterDto } from '../hospital-interpreter/models';

export interface HospitalDto extends EntityDto<number> {
  name?: string;
  code?: string;
  address?: string;
  cityId: number;
  phoneNumber?: string;
  phoneCountryCodeId?: number;
  email?: string;
  isActive: boolean;
  phoneCountryCode: NationalityDto;
  city: CityDto;
  hospitalStaffs: HospitalStaffDto[];
  hospitalUHBStaffs: HospitalUHBStaffDto[];
  hospitalPricers: HospitalPricerDto[];
  hospitalInterpreters: HospitalInterpreterDto[];
}

export interface SaveHospitalDto {
  name: string;
  code: string;
  address: string;
  cityId: number;
  phoneNumber?: string;
  phoneCountryCodeId?: number;
  email?: string;
  isActive: boolean;
}
