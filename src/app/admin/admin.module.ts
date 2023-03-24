import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HospitalComponent } from './hospital/hospital.component';
import { HospitalService } from '../services/hospital.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NationalityComponent } from './nationality/nationality.component';
import { LanguageComponent } from './language/language.component';
import { PatientNoteStatusComponent } from './patient-note-status/patient-note-status.component';
import { PatientNoteStatusService } from '../services/patientNoteStatus.service';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { DocumentTypeService } from '../services/documentType.service';
import { PatientDocumentStatusService } from '../services/patientDocumentStatus.service';
import { PatientDocumentStatusComponent } from './patient-document-status/patient-document-status.component';
import { TreatmentProcessStatusService } from '../services/treatmentProcessStatus.service';
import { PatientAdmissionMethodService } from '../services/patientAdmissionMethod.service';
import { ContractedInstitutionService } from '../services/contractedInstitution.service';
import { HospitalConsultationStatusService } from '../services/hospitalConsultationStatus.service';
import { TreatmentProcessStatusComponent } from './treatment-process-status/treatment-process-status.component';
import { PatientAdmissionMethodComponent } from './patient-admission-method/patient-admission-method.component';
import { ContractedInstitutionComponent } from './contracted-institution/contracted-institution.component';
import { HospitalConsultationStatusComponent } from './hospital-consultation-status/hospital-consultation-status.component';


@NgModule({
  declarations: [
    HospitalComponent,
    NationalityComponent,
    LanguageComponent,
    PatientNoteStatusComponent,
    DocumentTypeComponent,
    PatientDocumentStatusComponent,
    TreatmentProcessStatusComponent,
    PatientAdmissionMethodComponent,
    ContractedInstitutionComponent,
    HospitalConsultationStatusComponent
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
    DocumentTypeService,
    PatientDocumentStatusService,
    TreatmentProcessStatusService,
    PatientAdmissionMethodService,
    ContractedInstitutionService,
    HospitalConsultationStatusService
  ]
})
export class AdminModule { }
