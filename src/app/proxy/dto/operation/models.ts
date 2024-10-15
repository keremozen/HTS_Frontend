import type { FullAuditedEntityWithUserDto } from '@abp/ng.core';
import type { EntityEnum_OperationTypeEnum } from '../../enum/entity-enum-operation-type-enum.enum';
import type { EntityEnum_OperationStatusEnum } from '../../enum/entity-enum-operation-status-enum.enum';
import type { TreatmentTypeDto } from '../treatment-type/models';
import type { OperationTypeDto } from '../operation-type/models';
import type { OperationStatusDto } from '../operation-status/models';
import type { IdentityUserDto } from '../../volo/abp/identity/models';
import type { HospitalDto } from '../hospital/models';
import type { PatientTreatmentProcessDto } from '../patient-treatment-process/models';
import type { HospitalResponseDto, SaveHospitalResponseDto } from '../hospital-response/models';
import type { EntityEnum_TreatmentTypeEnum } from '../../enum/entity-enum-treatment-type-enum.enum';

export interface OperationDto extends FullAuditedEntityWithUserDto<number, IdentityUserDto> {
  hospitalResponseId: number;
  treatmentTypeId: number;
  patientTreatmentProcessId?: number;
  hospitalId?: number;
  operationTypeId: EntityEnum_OperationTypeEnum;
  operationStatusId: EntityEnum_OperationStatusEnum;
  treatmentType: TreatmentTypeDto;
  operationType: OperationTypeDto;
  operationStatus: OperationStatusDto;
  appointedInterpreter: IdentityUserDto;
  hospital: HospitalDto;
  patientTreatmentProcess: PatientTreatmentProcessDto;
  hospitalResponse: HospitalResponseDto;
}

export interface SaveOperationDto {
  hospitalResponseId: number;
  treatmentTypeId: EntityEnum_TreatmentTypeEnum;
  patientTreatmentProcessId?: number;
  hospitalId?: number;
  hospitalResponse: SaveHospitalResponseDto;
}
