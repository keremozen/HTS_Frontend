import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_ProformaStatusEnum {
  NewRecord = 1,
  MFBWaitingApproval = 2,
  MFBRejected = 3,
  WillBeTransferedToPatient = 4,
  WaitingForPatientApproval = 5,
  PatientRejected = 6,
  WaitingForPayment = 7,
  PaymentCompleted = 8,
}

export const entityEnum_ProformaStatusEnumOptions = mapEnumToOptions(EntityEnum_ProformaStatusEnum);
