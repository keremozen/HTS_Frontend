import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-treatment-processes',
  templateUrl: './treatment-processes.component.html',
  styleUrls: ['./treatment-processes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreatmentProcessesComponent extends AppComponentBase {
  processes: any[] = [];
  selectedProcesses: any[];
  processDialog: boolean = false;
  showCompletedRecords: boolean = false;
  completedRecordCount: number = 0;
  displayProcessDetail: boolean = false;
  process: any;

  constructor(injector: Injector) {
    super(injector);
  }

  newTreatmentProcess() {
    this.displayProcessDetail = true;
    this.process = {};
  }

  deleteProcess(process: any) {

  }
}
