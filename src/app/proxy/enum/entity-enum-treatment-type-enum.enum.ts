import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_TreatmentTypeEnum {
  InPatient = 1,
  OutPatient = 2,
}

export const entityEnum_TreatmentTypeEnumOptions = mapEnumToOptions(EntityEnum_TreatmentTypeEnum);
