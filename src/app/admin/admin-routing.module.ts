import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractedInstitutionComponent } from './contracted-institution/contracted-institution.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LanguageComponent } from './language/language.component';
import { NationalityComponent } from './nationality/nationality.component';
import { PatientAdmissionMethodComponent } from './patient-admission-method/patient-admission-method.component';

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
    path: 'documentType', component: DocumentTypeComponent
  },
  {
    path: 'patientAdmissionMethod', component: PatientAdmissionMethodComponent
  },
  {
    path: 'contractedInstitution', component: ContractedInstitutionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
