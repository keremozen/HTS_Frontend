import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_HospitalAgentNoteStatusEnum {
  NewRecord = 1,
  Revoked = 2,
}

export const entityEnum_HospitalAgentNoteStatusEnumOptions = mapEnumToOptions(EntityEnum_HospitalAgentNoteStatusEnum);
