import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { ContractedInstitutionDto } from '@proxy';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientAdmissionMethodDto } from '@proxy/dto/patient-admission-method';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-companion-info',
  templateUrl: './companion-info.component.html',
  styleUrls: ['./companion-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanionInfoComponent extends AppComponentBase {

  patientAdmissionMethodList: PatientAdmissionMethodDto[] = [];
  contractedInstitutionList: ContractedInstitutionDto[] = [];
  institutionOfficerList: any[] = [];
  nationalityList: NationalityDto[] = [];

  attendantInfo: any;

  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  
}
