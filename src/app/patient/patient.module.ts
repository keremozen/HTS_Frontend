import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NationalityService } from '../services/nationality.service';
import { LanguageService } from '../services/language.service';
import { PatientComponent } from './patient/patient.component';
import { NotesComponent } from './notes/notes.component';
import { DocumentsComponent } from './documents/documents.component';
import { TreatmentProcessesComponent } from './treatment-processes/treatment-processes.component';
import { AttendantInfoComponent } from './treatment-processes/attendant-info.component';
import { OperationalInfoComponent } from './treatment-processes/operational-info.component';
import { QuotationComponent } from './treatment-processes/quotation.component';
import { HospitalConsultationComponent } from './treatment-processes/hospital-consultation.component';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientComponent,
    NotesComponent,
    DocumentsComponent,
    TreatmentProcessesComponent,
    AttendantInfoComponent,
    HospitalConsultationComponent,
    OperationalInfoComponent,
    QuotationComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    PatientRoutingModule
  ],
  providers: [
    NationalityService,
    LanguageService
  ]
})
export class PatientModule { }
