import { PermissionGuard } from '@abp/ng.core';
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
    path: 'hospital', component: HospitalComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.HospitalManagement' 
    }
  },
  {
    path: 'nationality', component: NationalityComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.NationalityManagement' 
    }
  },
  {
    path: 'language', component: LanguageComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.LanguageManagement' 
    }
  },
  {
    path: 'documentType', component: DocumentTypeComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.DocumentTypeManagement' 
    }
  },
  {
    path: 'patientAdmissionMethod', component: PatientAdmissionMethodComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.PatientAdmissionMethodManagement' 
    }
  },
  {
    path: 'contractedInstitution', component: ContractedInstitutionComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.ContractedInstitutionManagement' 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
