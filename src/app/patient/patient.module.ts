import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PatientListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
