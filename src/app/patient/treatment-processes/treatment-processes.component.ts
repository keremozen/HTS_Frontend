import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { PatientDto } from '@proxy/dto/patient';
import { PatientTreatmentProcessDetailedDto, PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';
import { SalesMethodAndCompanionInfoDto } from '@proxy/dto/sales-method-and-companion-info';
import { PatientTreatmentProcessService, SalesMethodAndCompanionInfoService, USSService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-treatment-processes',
  templateUrl: './treatment-processes.component.html',
  styleUrls: ['./treatment-processes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreatmentProcessesComponent extends AppComponentBase {
  @Input() patient: PatientDto;
  @Input() noTreatmentPlan: boolean;
  processes: PatientTreatmentProcessDetailedDto[] = [];
  selectedProcess: PatientTreatmentProcessDto;
  processDialog: boolean = false;
  showCompletedRecords: boolean = false;
  completedRecordCount: number = 0;
  displayProcessDetail: boolean = false;
  totalRecords: number = 0;
  doesHaveAnySalesMethodAndCompanionInfo: boolean = false;
  activeIndex = 0;
  salesAndCompanionInfo: SalesMethodAndCompanionInfoDto;
  isAllowedToManage: boolean = false;

  constructor(
    injector: Injector,
    private patientTreatmentProcessService: PatientTreatmentProcessService,
    private salesAndCompanionInfoService: SalesMethodAndCompanionInfoService,
    private ussService: USSService) {
    super(injector);
    this.isAllowedToManage = this.permission.getGrantedPolicy("HTS.PatientManagement");
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.patientTreatmentProcessService.getListByPatientId(+this.patient.id).subscribe({
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
        this.patientTreatmentProcessService.start(+this.patient.id).subscribe({
          complete: () => {
            this.fetchData();
            this.success(this.l('::TreatmentProcess:Message:SuccessfulStart'));
          }
        });
      }
    });
  }

  onDisplayTreatmentProcessDetail() {
    if (this.selectedProcess) {
      this.activeIndex = 0;
      this.displayProcessDetail = false;

      this.ussService.setENabizProcessByTreatmentCode(this.selectedProcess.treatmentCode).subscribe({
        next: (res) => {
          if (res.durum == 0) {
            this.error(res.mesaj);
          }
        },
        complete: () => {
          this.salesAndCompanionInfoService.getByPatientTreatmentProcessId(this.selectedProcess.id as unknown as number).subscribe({
            next: (res) => {
              debugger;
              this.salesAndCompanionInfo = res as SalesMethodAndCompanionInfoDto;
              this.doesHaveAnySalesMethodAndCompanionInfo = (res != null || res != undefined);
            },
            complete: () => {
              this.displayProcessDetail = true;
            }
          });
        }
      });
    }
    else {
      this.displayProcessDetail = false;
    }
  }

  onSaveSalesInfoAndCompanionInfo() {
    this.doesHaveAnySalesMethodAndCompanionInfo = true;
  }

  consultationChanged(event: any) {
    this.fetchData();
  }

  operationChanged(event: any) {
    this.fetchData();
  }

  quotationChanged(event: any) {
    this.fetchData();
  }
}
