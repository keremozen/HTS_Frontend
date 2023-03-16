import { Component, Injector, ViewEncapsulation } from '@angular/core';
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

  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  openNew() {

  }
}
