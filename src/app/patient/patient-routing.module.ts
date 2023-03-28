import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { NewPatientComponent } from './new-patient/new-patient.component';

const routes: Routes = [
  {
    path: '', component: PatientListComponent
  },
  {
    path: 'new', component: NewPatientComponent
  },
  {
    path: 'edit/:id', component: PatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
