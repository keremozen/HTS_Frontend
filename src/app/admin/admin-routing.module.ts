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
import { ProcessTypeComponent } from './process-type/process-type.component';
import { ProcessComponent } from './process/process.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';
import { PaymentReasonComponent } from './payment-reason/payment-reason.component';
import { ContractedInstitutionTypeComponent } from './contracted-institution-type/contracted-institution-type.component';
import { ContractedInstitutionKindComponent } from './contracted-institution-kind/contracted-institution-kind.component';
import { ProcessKindComponent } from './process-kind/process-kind.component';
import { FinalizationTypeComponent } from './finalization-type/finalization-type.component';

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
    path: 'contractedInstitutionType', component: ContractedInstitutionTypeComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.ContractedInstitutionTypeManagement' 
    }
  },
  {
    path: 'contractedInstitutionKind', component: ContractedInstitutionKindComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.ContractedInstitutionKindManagement' 
    }
  },
  {
    path: 'branch', component: BranchComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.BranchManagement' 
    }
  },
  {
    path: 'processType', component: ProcessTypeComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.ProcessTypeManagement' 
    }
  },
  {
    path: 'processKind', component: ProcessKindComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.ProcessKindManagement' 
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
  },
  {
    path: 'finalizationType', component: FinalizationTypeComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.FinalizationTypeManagement' 
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
