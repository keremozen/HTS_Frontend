import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NationalityService } from '../services/nationality.service';
import { LanguageService } from '../services/language.service';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { NotesComponent } from './notes/notes.component';
import { DocumentsComponent } from './documents/documents.component';
import { TreatmentProcessesComponent } from './treatment-processes/treatment-processes.component';


@NgModule({
  declarations: [
    PatientListComponent,
    NewPatientComponent,
    NotesComponent,
    DocumentsComponent,
    TreatmentProcessesComponent
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
