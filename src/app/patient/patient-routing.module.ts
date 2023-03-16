import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: '', component: PatientListComponent
  },
  {
    path: 'detail', component: PatientComponent
  },
  {
    path: 'detail/:id', component: PatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
