import type { SaveHospitalResponseDto } from '../hospital-response/models';

export interface SaveOperationDto {
  hospitalResponseId: number;
  travelDateToTurkey?: string;
  treatmentDate?: Date;
  treatmentTypeId?: number;
  anyInvitationLetter?: boolean;
  appointedInterpreterId?: string;
  patientTreatmentProcessId?: number;
  hospitalId?: number;
  hospitalResponse: SaveHospitalResponseDto;
}
