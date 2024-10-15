import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_OperationStatusEnum {
  NewRecord = 1,
  PriceExpecting = 2,
  ProformaCreatedWaitingForMFBApproval = 3,
  MFBRejectedPriceExpecting = 4,
  ProformaApprovedWillBeTransferredToPatient = 5,
  ProformaTransferredWaitingForPatientApproval = 6,
  PatientRejectedProforma = 7,
  ProformaApprovedWaitingForPayment = 8,
  PaymentCompletedTreatmentProcess = 9,
  Cancelled = 10,
}

export const entityEnum_OperationStatusEnumOptions = mapEnumToOptions(EntityEnum_OperationStatusEnum);
