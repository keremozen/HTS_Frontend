import type { EntityDto } from '@abp/ng.core';

export interface HospitalResponseMaterialDto extends EntityDto<number> {
  hospitalResponseId: number;
  materialId: number;
  amount: number;
}

export interface SaveHospitalResponseMaterialDto {
  hospitalResponseId: number;
  materialId: number;
  amount: number;
}
