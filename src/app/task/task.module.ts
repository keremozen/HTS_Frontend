import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    TaskRoutingModule
  ],
  providers: [
    DialogService
  ]
})
export class TaskModule { }
