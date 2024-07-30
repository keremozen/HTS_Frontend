import { mapEnumToOptions } from '@abp/ng.core';

export enum EntityEnum_TaskTypeEnum {
  Pricing = 1,
  PatientApproval = 2,
  Tik = 3,
  PTP = 4,
  DocumentTranslate = 5,
  EvaluationOfHospitalResponse = 6,
  WaitingSentPricing = 7,
  MFBApproval = 8,
  AnsweringProforma = 9,
  Collection = 10,
  UploadingCollectionReceipt = 11,
  RequestingDownPayment = 12,
  EnteringDownPayment = 13,
  SendingInvitationLetter = 14,
  EnteringTravelAccommodationPlan = 15,
  AppointmentScheduling = 16 
}

export const entityEnum_TaskTypeEnumOptions = mapEnumToOptions(EntityEnum_TaskTypeEnum);
