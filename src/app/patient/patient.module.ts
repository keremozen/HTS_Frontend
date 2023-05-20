import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PatientComponent } from './patient/patient.component';
import { NotesComponent } from './notes/notes.component';
import { DocumentsComponent } from './documents/documents.component';
import { TreatmentProcessesComponent } from './treatment-processes/treatment-processes.component';
import { CompanionInfoComponent } from './treatment-processes/companion-info.component';
import { OperationalInfoComponent } from './treatment-processes/operational-info.component';
import { QuotationComponent } from './treatment-processes/quotation.component';
import { HospitalConsultationComponent } from './treatment-processes/hospital-consultation.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { EntityEnum_HospitalConsultationStatusEnum } from '@proxy/enum';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientComponent,
    NewPatientComponent,
    NotesComponent,
    DocumentsComponent,
    TreatmentProcessesComponent,
    CompanionInfoComponent,
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
    
  ]
})
export class PatientModule { }
