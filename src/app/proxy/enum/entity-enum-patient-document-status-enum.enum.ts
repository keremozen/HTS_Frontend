import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_PatientDocumentStatusEnum {
  NewRecord = 1,
  Revoked = 2,
}

export const entityEnum_PatientDocumentStatusEnumOptions = mapEnumToOptions(EntityEnum_PatientDocumentStatusEnum);
