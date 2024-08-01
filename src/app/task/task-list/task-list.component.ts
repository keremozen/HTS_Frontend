import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTSTaskDto } from '@proxy/dto/htstask';
import { PatientDto } from '@proxy/dto/patient';
import { TaskTypeDto } from '@proxy/dto/task-type';
import { HTSTaskService } from '@proxy/service';
import { IdentityUserDto } from '@proxy/volo/abp/identity';
import { CommonService } from 'src/app/services/common.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {

  taskList: HTSTaskDtoWithDetail[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  now = moment();

  constructor(
    private commonService: CommonService,
    private htsTaskService: HTSTaskService,
    private router: Router) {
  }

  ngOnInit(): void {
   this.htsTaskService.getList().subscribe({
    next: (res) => {
      this.commonService.addTaskList(res.items);
      this.taskList = res.items as HTSTaskDtoWithDetail[];
    },
    complete: () => {
      this.taskList.forEach(task => {
        if (task.patient?.name) {
          task.patientNameSurname = task.patient?.name;
          if (task.patient?.surname) {
            task.patientNameSurname = task.patientNameSurname + " " + task.patient?.surname;
          }
        }
        if (task.user?.name) {
          task.patientCreatedBy = task.user?.name;
          if (task.user?.surname) {
            task.patientCreatedBy = task.patientCreatedBy + " " + task.user?.surname;
          }
        }
        task.timeElapsed = this.calculateElapsedTime(task.creationTime);
      });
      this.totalRecords = this.taskList.length;
    }
   });
    
  }

  goToTask(task: HTSTaskDtoWithDetail) {
    window.location.href = task.url;
  }

  calculateElapsedTime(time: Date): string {
    let delta = moment().diff(time, 'minutes');

    var days = Math.floor(delta / 1440);
    delta -= days * 1440;
    var hours = Math.floor(delta / 60) % 24;
    delta -= hours * 60;
    var minutes = Math.floor(delta) % 60;
    delta -= minutes;

    let result = "";
    if (days > 0) {
      result += days + " gün ";
    }
    if (hours > 0) {
      result += hours + " saat ";
    }
    if (minutes > 0) {
      result += minutes + " dakika ";
    }
    return result;
  }
}

class HTSTaskDtoWithDetail implements HTSTaskDto {
  creationTime: Date;
  userId?: string;
  patientId: number;
  taskTypeId: number;
  isActive: boolean;
  url?: string;
  relatedEntityId: number;
  taskType: TaskTypeDto;
  patient: PatientDto;
  user: IdentityUserDto;
  id?: number;
  patientNameSurname: string;
  patientCreatedBy: string;
  taskDate: Date;
  timeElapsed: string;
}


