import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HospitalComponent } from './hospital/hospital.component';
import { HospitalService } from '../services/hospital.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HospitalComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  providers: [HospitalService]
})
export class AdminModule { }
