import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { IPatientNote, PatientNote } from 'src/app/models/patient/patientNote.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuotationComponent extends AppComponentBase {

  
  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  
}