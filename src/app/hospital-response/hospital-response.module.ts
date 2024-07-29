import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HospitalResponseComponent } from './hospital-response.component';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationListComponent } from './consultation-list.component';

const routes: Routes = [
  {
    path: 'consultation-list', component: ConsultationListComponent
  },
  {
    path: ':uid', component: HospitalResponseComponent
  }
];


@NgModule({
  declarations: [
    HospitalResponseComponent,
    ConsultationListComponent
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
