import type { EntityDto } from '@abp/ng.core';
import type { HospitalResponseTypeDto } from '../hospital-response-type/models';
import type { HospitalizationTypeDto } from '../hospitalization-type/models';
import type { HospitalResponseBranchDto, SaveHospitalResponseBranchDto } from '../hospital-response-branch/models';
import type { HospitalResponseProcessDto, SaveHospitalResponseProcessDto } from '../hospital-response-process/models';
import type { HospitalResponseMaterialDto, SaveHospitalResponseMaterialDto } from '../hospital-response-material/models';
import type { EntityEnum_HospitalResponseTypeEnum } from '../../enum/entity-enum-hospital-response-type-enum.enum';
import type { EntityEnum_HospitalizationTypeEnum } from '../../enum/entity-enum-hospitalization-type-enum.enum';

export interface HospitalResponseDto extends EntityDto<number> {
  hospitalConsultationId: number;
  description?: string;
  hospitalResponseTypeId: number;
  hospitalizationTypeId?: number;
  possibleTreatmentDate?: string;
  hospitalizationNumber?: number;
  hospitalResponseType: HospitalResponseTypeDto;
  hospitalizationType: HospitalizationTypeDto;
  hospitalResponseBranches: HospitalResponseBranchDto[];
  hospitalResponseProcesses: HospitalResponseProcessDto[];
  hospitalResponseMaterials: HospitalResponseMaterialDto[];
}

export interface SaveHospitalResponseDto {
  hospitalConsultationId: number;
  description?: string;
  hospitalResponseTypeId: number;
  hospitalizationTypeId?: number;
  possibleTreatmentDate?: string;
  hospitalizationNumber?: number;
  hospitalResponseType: EntityEnum_HospitalResponseTypeEnum;
  hospitalizationType: EntityEnum_HospitalizationTypeEnum;
  hospitalResponseBranches: SaveHospitalResponseBranchDto[];
  hospitalResponseProcesses: SaveHospitalResponseProcessDto[];
  hospitalResponseMaterials: SaveHospitalResponseMaterialDto[];
}
