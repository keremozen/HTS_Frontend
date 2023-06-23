import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_OperationStatusEnum {
  PriceExpecting = 1,
  ProformaCreatedWaitingForMFBApproval = 2,
  MFBRejectedPriceExpecting = 3,
  ProformaApprovedWillBeTransferredToPatient = 4,
  ProformaTransferredWaitingForPatientApproval = 5,
  PatientRejectedProforma = 6,
  ProformaApprovedWaitingForPayment = 7,
  PaymentCompletedTreatmentProcess = 8,
}

export const entityEnum_OperationStatusEnumOptions = mapEnumToOptions(EntityEnum_OperationStatusEnum);
