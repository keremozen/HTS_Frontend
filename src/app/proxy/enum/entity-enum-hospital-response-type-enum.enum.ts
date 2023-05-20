import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_HospitalResponseTypeEnum {
  SuitableForTreatment = 1,
  NotSuitableForTreatment = 2,
  ExaminationsIsRequiredForDiagnosis = 3,
}

export const entityEnum_HospitalResponseTypeEnumOptions = mapEnumToOptions(EntityEnum_HospitalResponseTypeEnum);
