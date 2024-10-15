import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { FinalizationTypeDto } from '@proxy/dto/finalization-type';
import { PatientDto } from '@proxy/dto/patient';
import { FinalizePtpDto, PatientTreatmentProcessDetailedDto, PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';
import { SalesMethodAndCompanionInfoDto } from '@proxy/dto/sales-method-and-companion-info';
import { PatientDocumentService, PatientTreatmentProcessService, SalesMethodAndCompanionInfoService, USSService } from '@proxy/service';
import { CommonService } from 'src/app/services/common.service';
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
  @Output() documentUploaded: EventEmitter<any> = new EventEmitter();
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
  finalizationDialog: boolean = false;
  finalizationPtp: FinalizePtpDto;
  typeList: FinalizationTypeDto[] = [];

  constructor(
    injector: Injector,
    private patientTreatmentProcessService: PatientTreatmentProcessService,
    private salesAndCompanionInfoService: SalesMethodAndCompanionInfoService,
    private ussService: USSService,
    private commonService: CommonService
  ) {
    super(injector);
    this.isAllowedToManage = this.permission.getGrantedPolicy("HTS.PatientManagement");
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.typeList = this.commonService.finalizationTypeList;
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

  onSalesInfoDocumentUploaded() {
    this.documentUploaded.emit();
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

  onFinalize(process: PatientTreatmentProcessDetailedDto) {
    this.finalizationPtp = {} as FinalizePtpDto;
    this.finalizationDialog = true;
  }

  onDefinalize(process: PatientTreatmentProcessDetailedDto) {
    this.confirm({
      key: 'treatmentProcessConfirm',
      message: this.l('::TreatmentProcess:Message:DefinalizeConfirmation'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientTreatmentProcessService.deFinalize(+process.id).subscribe({
          complete: () => {
            this.finalizationDialog = false;
            this.fetchData();
            this.success(this.l('::TreatmentProcess:Message:SuccessfulDefinalize'));
          }
        });
      }
    });
  }

  hideDialog() {
    this.finalizationPtp = null;
    this.finalizationDialog = false;
  }

  finalize() {
    if (this.finalizationPtp) {
      this.patientTreatmentProcessService.finalize(+this.selectedProcess.id, this.finalizationPtp).subscribe({
        complete: () => {
          this.finalizationDialog = false;
            this.fetchData();
            this.success(this.l('::TreatmentProcess:Message:SuccessfulFinalize'));
        }
      });
    }
  }

  getFinalizationTooltip(process: PatientTreatmentProcessDetailedDto) {
    if (process.finalizationTypeId) {
       return "<b>" + this.typeList.find(x => x.id == process.finalizationTypeId).name + "</b><br>" + process.finalizationDescription;
    }
    return '';
  }
}
