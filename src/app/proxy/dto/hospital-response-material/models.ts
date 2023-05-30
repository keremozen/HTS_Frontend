import type { EntityDto } from '@abp/ng.core';
import type { MaterialDto } from '../material/models';

export interface HospitalResponseMaterialDto extends EntityDto<number> {
  hospitalResponseId: number;
  materialId: number;
  amount: number;
  material: MaterialDto;
}

export interface SaveHospitalResponseMaterialDto {
  hospitalResponseId: number;
  materialId: number;
  amount: number;
}
