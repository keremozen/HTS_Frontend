import { Component, EventEmitter, Injector, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProformaPricingListDto, RejectProformaDto } from '@proxy/dto/proforma';
import { EntityEnum_OperationTypeEnum, EntityEnum_ProformaStatusEnum } from '@proxy/enum';
import { OperationService, PatientTreatmentProcessService, ProformaService, RejectReasonService, USSService } from '@proxy/service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { ProformaComponent } from '../proforma/proforma.component';
import { PatientDto } from '@proxy/dto/patient';
import { RejectReasonDto } from '@proxy/dto/reject-reason';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { PaymentListComponent } from '../payment-list/payment-list.component';
import { ListENabizProcessDto } from '@proxy/dto/external';
import { forkJoin } from 'rxjs';
import { PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuotationComponent extends AppComponentBase {

  @Input() patientTreatmentId: number;
  @Input() patient: PatientDto;
  @Output() onQuotationChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('paymentListComp') paymentListComp: PaymentListComponent;

  proformaList: ProformaPricingListDto[] = [];
  loading: boolean = false;
  public proformaStatusEnum = EntityEnum_ProformaStatusEnum;
  public operationTypeEnum = EntityEnum_OperationTypeEnum;
  paymentDialogRef: DynamicDialogRef;
  proformaDialogRef: DynamicDialogRef;

  patientTreatmentProcess: PatientTreatmentProcessDto;
  enabizProcessList: ListENabizProcessDto[] = [];
  totalEnabizProcessCount: number = 0;

  displayMFBReject: boolean = false;
  displayPatientReject: boolean = false;
  rejectProforma: RejectProformaDto;
  rejectReasonList: RejectReasonDto[] = [];

  isAllowedToManagePatient: boolean = false;
  isAllowedToManageProforma: boolean = false;
  isAllowedToApproveRejectAsMFB: boolean = false;
  isAllowedToApproveRejectAsPatient: boolean = false;

  constructor(
    injector: Injector,
    private proformaService: ProformaService,
    private operationService: OperationService,
    private rejectReasonService: RejectReasonService,
    public dialogService: DialogService,
    public ussService: USSService,
    public patientTreatmentService: PatientTreatmentProcessService
  ) {
    super(injector);
    this.isAllowedToManagePatient = this.permission.getGrantedPolicy("HTS.PatientManagement");
    this.isAllowedToManageProforma = this.permission.getGrantedPolicy("HTS.ProformaManagement");
    this.isAllowedToApproveRejectAsMFB = this.permission.getGrantedPolicy("HTS.MFBApproval");
    this.isAllowedToApproveRejectAsPatient = this.permission.getGrantedPolicy("HTS.PatientApproval");
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    forkJoin([
      this.patientTreatmentService.getByPatientTreatmentProcessId(this.patientTreatmentId),
      this.proformaService.getPricingListByPTPId(this.patientTreatmentId)
    ]).subscribe({
      next: ([
        resPatientTreatment,
        resPricingList
      ]) => {
        this.patientTreatmentProcess = resPatientTreatment;
        this.proformaList = resPricingList as ProformaPricingListDto[];
      },
      complete: () => {
        this.ussService.getENabizProcessesByTreatmentCode(this.patientTreatmentProcess.treatmentCode).subscribe({
          next: (resEnabizProcess) => {
            this.enabizProcessList = resEnabizProcess;
            this.totalEnabizProcessCount = resEnabizProcess.length;
          }
        });
      }
    });
  }

  onApproveClick(proforma: ProformaPricingListDto) {
    if (proforma.proformaStatusId == this.proformaStatusEnum.MFBWaitingApproval) {
      this.confirm({
        key: 'quotationConfirm',
        message: this.l('::Quotation:ProformaTable:Message:ConfirmApprove'),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.proformaService.approveMFB(+proforma.id).subscribe({
            complete: () => {
              this.fetchData();
              this.onQuotationChange.emit();
            }
          });
        }
      });
    }
    if (proforma.proformaStatusId == this.proformaStatusEnum.WaitingForPatientApproval) {
      this.confirm({
        key: 'quotationConfirm',
        message: this.l('::Quotation:ProformaTable:Message:ConfirmApprove'),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.proformaService.approvePatient(+proforma.id).subscribe({
            complete: () => {
              this.fetchData();
              this.onQuotationChange.emit();
            }
          });
        }
      });
    }
  }

  onRejectClick(proforma: ProformaPricingListDto) {
    if (proforma.proformaStatusId == this.proformaStatusEnum.MFBWaitingApproval) {
      this.rejectProforma = {} as RejectProformaDto;
      this.rejectProforma.id = +proforma.id;
      this.rejectProforma.rejectReasonId = null;
      this.displayMFBReject = true;
    }
    if (proforma.proformaStatusId == this.proformaStatusEnum.WaitingForPatientApproval) {
      this.rejectReasonService.getList(true).subscribe({
        next: (res) => {
          this.rejectReasonList = res.items;
          this.rejectProforma = {} as RejectProformaDto;
          this.rejectProforma.id = +proforma.id;
          this.rejectProforma.rejectReason = null;
          this.displayPatientReject = true;
        }
      });

    }
  }

  hideMFBrejectDialog() {
    this.rejectProforma = null;
    this.displayMFBReject = false;
  }

  hidePatientRejectDialog() {
    this.rejectProforma = null;
    this.displayPatientReject = false;
  }

  onMFBReject() {
    this.confirm({
      key: 'quotationConfirm',
      message: this.l('::Quotation:MFBReject:Message:ConfirmApprove'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proformaService.rejectMFB(this.rejectProforma).subscribe({
          complete: () => {
            this.displayMFBReject = false;
            this.fetchData();
            this.onQuotationChange.emit();
          }
        });
      }
    });
  }

  onPatientReject() {
    this.confirm({
      key: 'quotationConfirm',
      message: this.l('::Quotation:PatientReject:Message:ConfirmApprove'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proformaService.rejectPatient(this.rejectProforma).subscribe({
          complete: () => {
            this.displayPatientReject = false;
            this.fetchData();
            this.onQuotationChange.emit();
          }
        });
      }
    });
  }

  onProformaCodeClick(proforma: ProformaPricingListDto) {
    this.operationService.get(proforma.operationId).subscribe({
      next: (op) => {
        this.proformaDialogRef = this.dialogService.open(ProformaComponent, {
          header: this.l('::Proforma:Title'),
          width: '85vw',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
            operation: op,
            hideSubmit: true,
            isDisabled: proforma.proformaStatusId !== this.proformaStatusEnum.MFBWaitingApproval
          }
        });

        this.proformaDialogRef.onClose.subscribe(() => {
          this.fetchData();
          this.onQuotationChange.emit();
        });
      }
    });

    
  }

  onSendToPatientClick(proforma: ProformaPricingListDto) {
    this.confirm({
      key: 'quotationConfirm',
      message: this.patient.email ? this.l('::Quotation:ProformaTable:Message:ConfirmSendToPatient') : this.l('::Quotation:ProformaTable:Message:ConfirmGivePatientManually'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proformaService.sendToPatientById(+proforma.id).subscribe({
          complete: () => {
            this.fetchData();
            this.onQuotationChange.emit();
          }
        });
      }
    });
  }

  onPaymentClick(proforma: ProformaPricingListDto) {
    this.operationService.get(proforma.operationId).subscribe({
      next: (op) => {
        this.paymentDialogRef = this.dialogService.open(PaymentDialogComponent, {
          header: this.l('::PaymentDialog:Title'),
          width: '85vw',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
            isRelatedWithProforma: true,
            patientName: this.patient.name + (this.patient.surname ? " " + this.patient.surname : ""),
            hospitalId: op.operationTypeId == this.operationTypeEnum.HospitalConsultation ? op.hospitalResponse.hospitalConsultation.hospital.id : 
                                                  (op.operationTypeId == this.operationTypeEnum.Manual ? op.hospitalId : null),
            proformaCode: proforma.proformaCode,
            proformaId: proforma.id,
            ptpId: op.patientTreatmentProcessId
          },
        });

        this.paymentDialogRef.onClose.subscribe(() => {
          this.fetchData();
          this.paymentListComp.fetchData();
          this.onQuotationChange.emit();
        });
      }
    });
  }

  onPaymentCompleted() {
    this.fetchData();
    this.onQuotationChange.emit();
  }
}
