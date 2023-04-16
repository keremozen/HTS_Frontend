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

@NgModule({
  declarations: [
    HospitalComponent,
    NationalityComponent,
    LanguageComponent,
    DocumentTypeComponent,
    PatientAdmissionMethodComponent,
    ContractedInstitutionComponent,
    CityComponent
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
