import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_AdditionalServiceEnum {
  TransferService = 1,
  MedicalSecondExamination = 2,
  Interpreting = 3,
  CoordinationService = 4,
  ServiceAdmission = 5,
  IntensiveCare = 6,
  Accomodation = 7,
  Trip = 8,
  PhysicalExamination = 9,
}

export const entityEnum_AdditionalServiceEnumOptions = mapEnumToOptions(EntityEnum_AdditionalServiceEnum);
