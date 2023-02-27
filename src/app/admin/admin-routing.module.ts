import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalComponent } from './hospital/hospital.component';

const routes: Routes = [
  {
    path: 'hospital', component: HospitalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
