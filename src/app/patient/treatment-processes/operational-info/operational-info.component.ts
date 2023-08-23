import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { HospitalDto } from '@proxy/dto/hospital';
import { HospitalConsultationDto } from '@proxy/dto/hospital-consultation';
import { HospitalConsultationDocumentDto } from '@proxy/dto/hospital-consultation-document';
import { HospitalResponseDto } from '@proxy/dto/hospital-response';
import { HospitalResponseProcessDto } from '@proxy/dto/hospital-response-process';
import { EntityEnum_OperationStatusEnum, EntityEnum_OperationTypeEnum, EntityEnum_PatientDocumentStatusEnum, EntityEnum_PatientTreatmentStatusEnum, EntityEnum_ProcessTypeEnum } from '@proxy/enum';
import { HospitalResponseService, OperationService } from '@proxy/service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { PatientDto } from '@proxy/dto/patient';
import { OperationDto } from '@proxy/dto/operation';
import { BranchDto } from '@proxy/dto/branch';
import { OperationComponent } from '../operation/operation.component';
import { ProformaComponent } from '../proforma/proforma.component';

@Component({
  selector: 'app-operational-info',
  templateUrl: './operational-info.component.html',
  styleUrls: ['./operational-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OperationalInfoComponent extends AppComponentBase {

  @Input() patientTreatmentId: number;
  @Input() patient: PatientDto;

  operations: OperationDto[] = [];
  selectedOperation: OperationDto;
  operation: OperationDto;
  loading: boolean;
  totalRecords: number = 0;
  hospitalList: HospitalDto[] = [];
  branchList: BranchDto[] = [];
  branchListText: string;
  hasPriceExceptingOperation: boolean = false;

  displayConsultationDialog: boolean;
  hospitalConsultation: HospitalConsultationDto;
  selectedHospitals: number[] = [];
  hospitalConsultationDocuments: HospitalConsultationDocumentDto[] = [];

  displayHospitalResponseDialog: boolean;
  hospitalResponse: HospitalResponseDto;

  anticipatedProcesses: HospitalResponseProcessDto[] = [];
  anticipatedMaterials: HospitalResponseProcessDto[] = [];

  public processTypeEnum = EntityEnum_ProcessTypeEnum;
  public operationTypeEnum = EntityEnum_OperationTypeEnum;
  public patientDocumentStatusEnum = EntityEnum_PatientDocumentStatusEnum;
  public operationStatusEnum = EntityEnum_OperationStatusEnum;
  public treatmentProcessStatusEnum = EntityEnum_PatientTreatmentStatusEnum;

  ref: DynamicDialogRef;

  @Output() onOperationChange: EventEmitter<any> = new EventEmitter();

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private operationService: OperationService,
    private hospitalResponseService: HospitalResponseService,
    public dialogService: DialogService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.hospitalList = this.commonService.hospitalList;
    this.branchList = this.commonService.branchList;
    this.operationService.getByPatientTreatmenProcess(this.patientTreatmentId).subscribe({
      next: (resOperationList) => {
        this.operations = resOperationList.items;
        this.totalRecords = resOperationList.totalCount;
        this.hasPriceExceptingOperation = this.operations.some(o=>o.operationStatusId == this.operationStatusEnum.PriceExpecting ||o.operationStatusId == this.operationStatusEnum.MFBRejectedPriceExpecting)
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onNewOperation() {
    this.ref = this.dialogService.open(OperationComponent, {
      header: this.l('::OperationalInfo:NewOperation'),
      width: '85vw',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        ptpId: this.patientTreatmentId,
        patient: this.patient
      },
    });

    this.ref.onClose.subscribe(() => {
      this.fetchData();
    });
  }

  onDisplayOperation(operation: OperationDto) {
    this.hospitalResponseService.get(operation?.hospitalResponseId).subscribe({
      next: (res) => {
        this.hospitalResponse = res;
        this.ref = this.dialogService.open(OperationComponent, {
          header: this.l('::OperationalInfo:OperationEdit'),
          width: '85vw',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
            operation: operation,
            hospitalResponse: this.hospitalResponse
          },
        });

        this.ref.onClose.subscribe(() => {
          this.fetchData();
          this.selectedOperation = null;
        });
      }
    });
  }

  onOperationSelect(event: any) {
    this.onDisplayOperation(this.selectedOperation);
  }

  openConsultation(consultation: HospitalConsultationDto) {
    this.hospitalConsultation = consultation;
    this.selectedHospitals = [consultation.hospitalId];
    debugger;
    this.hospitalConsultationDocuments = this.hospitalConsultation.hospitalConsultationDocuments;
    this.displayConsultationDialog = true;
  }

  hideConsultationDialog() {
    this.hospitalConsultation = null;
    this.selectedHospitals = [];
    this.hospitalConsultationDocuments = [];
    this.displayConsultationDialog = false;
  }

  openHospitalResponse(operation: OperationDto) {
      this.hospitalResponseService.get(operation.hospitalResponse.id).subscribe({
        next: (res) => {
          this.operation = operation;
          this.hospitalResponse = res;
          this.branchListText = this.branchList.filter(h => this.hospitalResponse.hospitalResponseBranches.map(b => b.branchId).includes(h.id)).map(b => b.name).join("<br>");
          this.anticipatedProcesses = this.hospitalResponse.hospitalResponseProcesses.filter(r => r.process.processTypeId == this.processTypeEnum.SutCode);
          this.anticipatedMaterials = this.hospitalResponse.hospitalResponseProcesses.filter(r => r.process.processTypeId == this.processTypeEnum.Material);
        },
        complete: () => {
          this.displayHospitalResponseDialog = true;
        }
      });
  }

  hideHospitalResponseDialog() {
    this.operation = null;
    this.branchListText = null;
    this.hospitalResponse = null;
    this.anticipatedProcesses = [];
    this.anticipatedMaterials = [];
    this.displayHospitalResponseDialog = false;
  }

  onCreateProforma(operation: OperationDto) {
    this.ref = this.dialogService.open(ProformaComponent, {
      header: this.l('::Proforma:Title'),
      width: '85vw',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        operation: operation,
        isDisabled: operation.patientTreatmentProcess.treatmentProcessStatusId === this.treatmentProcessStatusEnum.ProformaCreatedWaitingForMFBApproval
      },
    });

    this.ref.onClose.subscribe(() => {
      this.fetchData();
      this.selectedOperation = null;
      this.onOperationChange.emit();
    });
  }

  onSendToPricing(operation: OperationDto) {
    this.operationService.sendToPricingById(+operation.id).subscribe(r => {
      this.fetchData();
      this.selectedOperation = null;
      this.onOperationChange.emit();
    })
  }

}
