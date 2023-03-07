import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractedInstitutionComponent } from './contracted-institution/contracted-institution.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { HospitalConsultationStatusComponent } from './hospital-consultation-status/hospital-consultation-status.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LanguageComponent } from './language/language.component';
import { NationalityComponent } from './nationality/nationality.component';
import { PatientAdmissionMethodComponent } from './patient-admission-method/patient-admission-method.component';
import { PatientDocumentStatusComponent } from './patient-document-status/patient-document-status.component';
import { PatientNoteStatusComponent } from './patient-note-status/patient-note-status.component';
import { TreatmentProcessStatusComponent } from './treatment-process-status/treatment-process-status.component';

const routes: Routes = [
  {
    path: 'hospital', component: HospitalComponent
  },
  {
    path: 'nationality', component: NationalityComponent
  },
  {
    path: 'language', component: LanguageComponent
  },
  {
    path: 'patientNoteStatus', component: PatientNoteStatusComponent
  },
  {
    path: 'documentType', component: DocumentTypeComponent
  },
  {
    path: 'patientDocumentStatus', component: PatientDocumentStatusComponent
  },
  {
    path: 'treatmentProcessStatus', component: TreatmentProcessStatusComponent
  },
  {
    path: 'patientAdmissionMethod', component: PatientAdmissionMethodComponent
  },
  {
    path: 'contractedInstitution', component: ContractedInstitutionComponent
  },
  {
    path: 'hospitalConsultationStatus', component: HospitalConsultationStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
