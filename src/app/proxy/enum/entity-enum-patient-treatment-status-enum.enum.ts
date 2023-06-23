import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_PatientTreatmentStatusEnum {
  NewRecord = 1,
  HospitalAskedWaitingResponse = 2,
  HospitalAskedWaitingAssessment = 3,
  OperationApprovedWaitingPricing = 4,
  ProformaCreatedWaitingForMFBApproval = 5,
  MFBRejectedPriceExpecting = 6,
  ProformaApprovedWillBeTransferredToPatient = 7,
  ProformaTransferredWaitingForPatientApproval = 8,
  PatientRejectedProforma = 9,
  ProformaApprovedWaitingForPayment = 10,
  PaymentCompletedTreatmentProcess = 11,
}

export const entityEnum_PatientTreatmentStatusEnumOptions = mapEnumToOptions(EntityEnum_PatientTreatmentStatusEnum);
