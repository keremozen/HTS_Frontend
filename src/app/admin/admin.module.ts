import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HospitalComponent } from './hospital/hospital.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NationalityComponent } from './nationality/nationality.component';
import { LanguageComponent } from './language/language.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { PatientAdmissionMethodComponent } from './patient-admission-method/patient-admission-method.component';
import { ContractedInstitutionComponent } from './contracted-institution/contracted-institution.component';
import { CityComponent } from './city/city.component';
import { BranchComponent } from './branch/branch.component';
import { TreatmentTypeComponent } from './treatment-type/treatment-type.component';
import { ProcessTypeComponent } from './process-type/process-type.component';
import { ProcessComponent } from './process/process.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';
import { PaymentReasonComponent } from './payment-reason/payment-reason.component';
import { ContractedInstitutionTypeComponent } from './contracted-institution-type/contracted-institution-type.component';
import { ContractedInstitutionKindComponent } from './contracted-institution-kind/contracted-institution-kind.component';

@NgModule({
  declarations: [
    HospitalComponent,
    NationalityComponent,
    LanguageComponent,
    DocumentTypeComponent,
    PatientAdmissionMethodComponent,
    ContractedInstitutionComponent,
    ContractedInstitutionTypeComponent,
    ContractedInstitutionKindComponent,
    CityComponent,
    BranchComponent,
    TreatmentTypeComponent,
    ProcessTypeComponent,
    ProcessComponent,
    RejectReasonComponent,
    PaymentReasonComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  providers: [
  ]
})
export class AdminModule { }
