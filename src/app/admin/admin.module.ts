import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HospitalComponent } from './hospital/hospital.component';
import { HospitalService } from '../services/hospital.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NationalityComponent } from './nationality/nationality.component';
import { LanguageComponent } from './language/language.component';
import { PatientNoteStatusService } from '../services/patientNoteStatus.service';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { PatientDocumentStatusService } from '../services/patientDocumentStatus.service';
import { TreatmentProcessStatusService } from '../services/treatmentProcessStatus.service';
import { HospitalConsultationStatusService } from '../services/hospitalConsultationStatus.service';
import { PatientAdmissionMethodComponent } from './patient-admission-method/patient-admission-method.component';
import { ContractedInstitutionComponent } from './contracted-institution/contracted-institution.component';

@NgModule({
  declarations: [
    HospitalComponent,
    NationalityComponent,
    LanguageComponent,
    DocumentTypeComponent,
    PatientAdmissionMethodComponent,
    ContractedInstitutionComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  providers: [
    HospitalService,
    PatientNoteStatusService,
    PatientDocumentStatusService,
    TreatmentProcessStatusService,
    HospitalConsultationStatusService
  ]
})
export class AdminModule { }
