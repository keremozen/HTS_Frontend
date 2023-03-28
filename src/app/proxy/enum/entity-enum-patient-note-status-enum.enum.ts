import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_PatientNoteStatusEnum {
  NewRecord = 1,
  Revoked = 2,
}

export const entityEnum_PatientNoteStatusEnumOptions = mapEnumToOptions(EntityEnum_PatientNoteStatusEnum);
