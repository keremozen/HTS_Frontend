import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';
import { PatientTreatmentProcessService, SalesMethodAndCompanionInfoService } from '@proxy/service';
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
  processDialog: boolean = false;
  showCompletedRecords: boolean = false;
  completedRecordCount: number = 0;
  displayProcessDetail: boolean = false;
  process: PatientTreatmentProcessDto;
  totalRecords: number = 0;
  doesHaveAnySalesMethodAndCompanionInfo: boolean = false;


  constructor(
    injector: Injector,
    private patientTreatmentProcessService: PatientTreatmentProcessService,
    private salesAndCompanionInfoService: SalesMethodAndCompanionInfoService) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.patientTreatmentProcessService.getListByPatientId(this.patientId).subscribe({
      next: (res) => {
        this.processes = res.items;
        this.totalRecords = res.totalCount;
      }
    });
  }

  newTreatmentProcess() {
    this.confirm({
      key: 'noteConfirm',
      message: this.l('::TreatmentProcess:Message:StartConfirmation'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientTreatmentProcessService.start(this.patientId).subscribe({
          complete: () => {
            this.fetchData();
            this.success(this.l('::TreatmentProcess:Message:SuccessfulStart'));
          }
        });
      }
    });
  }

  onDisplayTreatmentProcessDetail(code: string) {
    this.process = this.processes.find(p=>p.treatmentCode == code);

    this.salesAndCompanionInfoService.getByPatientTreatmentProcessId(this.process.id as unknown as number).subscribe({
      next: (res) => {
        this.doesHaveAnySalesMethodAndCompanionInfo = (res != null || res != undefined);
      },
      complete: ()=> {
        this.displayProcessDetail = true;
      }
    });
  }

  onSaveSalesInfoAndCompanionInfo() {
    this.doesHaveAnySalesMethodAndCompanionInfo = true;
  }

  deleteProcess(process: any) {

  }

  consultationChanged(event: any) {
    this.fetchData();
  }
}
