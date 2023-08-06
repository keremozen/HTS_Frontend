import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_HospitalizationTypeEnum {
  MedicalTreatmentHospitalization = 1,
  SurgicalHospitalization = 2,
}

export const entityEnum_HospitalizationTypeEnumOptions = mapEnumToOptions(EntityEnum_HospitalizationTypeEnum);
