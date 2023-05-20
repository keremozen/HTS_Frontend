import type { EntityDto } from '@abp/ng.core';

export interface HospitalConsultationStatusDto extends EntityDto<number> {
  name?: string;
}
