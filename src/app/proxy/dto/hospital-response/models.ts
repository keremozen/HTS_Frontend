import type { EntityDto } from '@abp/ng.core';
import type { EntityEnum_HospitalResponseTypeEnum } from '../../enum/entity-enum-hospital-response-type-enum.enum';
import type { EntityEnum_HospitalizationTypeEnum } from '../../enum/entity-enum-hospitalization-type-enum.enum';
import type { HospitalResponseTypeDto } from '../hospital-response-type/models';
import type { HospitalizationTypeDto } from '../hospitalization-type/models';
import type { HospitalResponseBranchDto, SaveHospitalResponseBranchDto } from '../hospital-response-branch/models';
import type { HospitalResponseProcessDto, SaveHospitalResponseProcessDto } from '../hospital-response-process/models';
import type { HospitalResponseMaterialDto, SaveHospitalResponseMaterialDto } from '../hospital-response-material/models';
import type { HospitalConsultationDto } from '../hospital-consultation/models';

export interface HospitalResponseDto extends EntityDto<number> {
  hospitalConsultationId: number;
  description?: string;
  hospitalResponseTypeId: EntityEnum_HospitalResponseTypeEnum;
  hospitalizationTypeId?: EntityEnum_HospitalizationTypeEnum;
  possibleTreatmentDate?: Date;
  hospitalizationNumber?: number;
  isManuallyAdded: boolean;
  hospitalResponseType: HospitalResponseTypeDto;
  hospitalizationType: HospitalizationTypeDto;
  hospitalResponseBranches: HospitalResponseBranchDto[];
  hospitalResponseProcesses: HospitalResponseProcessDto[];
  hospitalResponseMaterials: HospitalResponseMaterialDto[];
  hospitalConsultation: HospitalConsultationDto;
}

export interface SaveHospitalResponseDto {
  hospitalConsultationId: number;
  description?: string;
  hospitalResponseTypeId: number;
  hospitalizationTypeId?: number;
  possibleTreatmentDate?: Date;
  hospitalizationNumber?: number;
  isManuallyAdded: boolean;
  hospitalResponseBranches: SaveHospitalResponseBranchDto[];
  hospitalResponseProcesses: SaveHospitalResponseProcessDto[];
  hospitalResponseMaterials: SaveHospitalResponseMaterialDto[];
}
