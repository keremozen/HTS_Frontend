import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_HospitalizationTypeEnum {
  MedicalTreatment = 1,
  Hospitalization = 2,
  SurgicalHospitalization = 3,
}

export const entityEnum_HospitalizationTypeEnumOptions = mapEnumToOptions(EntityEnum_HospitalizationTypeEnum);
