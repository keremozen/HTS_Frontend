import { PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractedInstitutionComponent } from './contracted-institution/contracted-institution.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LanguageComponent } from './language/language.component';
import { NationalityComponent } from './nationality/nationality.component';
import { PatientAdmissionMethodComponent } from './patient-admission-method/patient-admission-method.component';
import { CityComponent } from './city/city.component';
import { BranchComponent } from './branch/branch.component';
import { TreatmentTypeComponent } from './treatment-type/treatment-type.component';
import { ProcessTypeComponent } from './process-type/process-type.component';
import { ProcessComponent } from './process/process.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';
import { PaymentReasonComponent } from './payment-reason/payment-reason.component';

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
    path: 'city', component: CityComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.CityManagement' 
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
  },
  {
    path: 'branch', component: BranchComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.BranchManagement' 
    }
  },
  {
    path: 'treatmentType', component: TreatmentTypeComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.TreatmentTypeManagement' 
    }
  },
  {
    path: 'processType', component: ProcessTypeComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.ProcessTypeManagement' 
    }
  },
  {
    path: 'process', component: ProcessComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.ProcessManagement' 
    }
  },
  {
    path: 'rejectReason', component: RejectReasonComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.RejectReasonManagement' 
    }
  },
  {
    path: 'paymentReason', component: PaymentReasonComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.PaymentReasonManagement' 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
