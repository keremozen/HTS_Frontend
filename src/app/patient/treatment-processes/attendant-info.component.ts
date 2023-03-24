import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { NationalityDto } from '@proxy/dto/nationality';
import { IContractedInstitution } from 'src/app/models/contractedInstitution.model';
import { IPatientAdmissionMethod } from 'src/app/models/patientAdmissionMethod.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-attendant-info',
  templateUrl: './attendant-info.component.html',
  styleUrls: ['./attendant-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AttendantInfoComponent extends AppComponentBase {

  patientAdmissionMethodList: IPatientAdmissionMethod[] = [];
  contractedInstitutionList: IContractedInstitution[] = [];
  institutionOfficerList: any[] = [];
  nationalityList: NationalityDto[] = [];

  attendantInfo: any;

  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  
}
