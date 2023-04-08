import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';
import { PatientAdmissionMethodService, PatientTreatmentProcessService } from '@proxy/service';
import { MenuItem } from 'primeng/api';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-treatment-processes',
  templateUrl: './treatment-processes.component.html',
  styleUrls: ['./treatment-processes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreatmentProcessesComponent extends AppComponentBase {
  @Input() patientId: number;
  processes: PatientTreatmentProcessDto[] = [];
  selectedProcesses: PatientTreatmentProcessDto[];
  processDialog: boolean = false;
  showCompletedRecords: boolean = false;
  completedRecordCount: number = 0;
  displayProcessDetail: boolean = false;
  process: PatientTreatmentProcessDto;
  totalRecords: number = 0;

  constructor(
    injector: Injector,
    private patientTreatmentProcessService: PatientTreatmentProcessService) {
    super(injector);
  }

  newTreatmentProcess() {
    this.patientTreatmentProcessService.start(this.patientId).subscribe({
      next: (res) => {
        debugger;
        this.processes.push(res);
      },
      error: () => {

      },
      complete: () => {
        this.displayProcessDetail = true;
      }
    });
  }

  deleteProcess(process: any) {

  }
}
