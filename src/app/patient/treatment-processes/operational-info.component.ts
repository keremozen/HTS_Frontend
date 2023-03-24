import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { IPatientNote, PatientNote } from 'src/app/models/patient/patientNote.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-operational-info',
  templateUrl: './operational-info.component.html',
  styleUrls: ['./operational-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OperationalInfoComponent extends AppComponentBase {

  
  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  
}
