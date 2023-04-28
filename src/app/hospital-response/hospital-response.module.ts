import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HospitalResponseComponent } from './hospital-response.component';
import { RouterModule, Routes } from '@angular/router';
import { PatientModule } from '../patient/patient.module';

const routes: Routes = [
  /*{
    path: '/:uid', component: HospitalResponseComponent, canActivate: [PermissionGuard],
    data: {
        requiredPolicy: 'HTS.HospitalResponse' 
    }
  }*/
  {
    path: ':uid', component: HospitalResponseComponent
  }
];


@NgModule({
  declarations: [
    HospitalResponseComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  exports: [RouterModule]
})
export class HospitalResponseModule { }
