import { Component, EventEmitter, Injector, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { PatientTreatmentProcessService, PaymentDocumentService, PaymentService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { ListPaymentDto } from '@proxy/dto/payment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { EntityEnum_OperationTypeEnum, EntityEnum_PatientTreatmentStatusEnum } from '@proxy/enum';
import { PatientDto } from '@proxy/dto/patient';
import { FileUpload } from 'primeng/fileupload';
import { SavePaymentDocumentDto } from '@proxy/dto/payment-document';
import { forkJoin } from 'rxjs';
import { PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentListComponent extends AppComponentBase {
  @Input() ptpId: number;
  @Input() patient: PatientDto;
  @Output() onPaymentCompleted: EventEmitter<any> = new EventEmitter();
  paymentList: ListPaymentDto[] = [];
  loading: boolean = false;
  paymentDialogRef: DynamicDialogRef;
  displayUploadInvoice: boolean = false;
  uploadedInvoices: any[] = [];
  paymentDocument: SavePaymentDocumentDto;
  treatmentProcess: PatientTreatmentProcessDto;
  @ViewChild("invoices", { static: false }) documentUpload: FileUpload;

  public operationTypeEnum = EntityEnum_OperationTypeEnum;
  public preatmentTreatmentStatusEnum = EntityEnum_PatientTreatmentStatusEnum;

  constructor(
    injector: Injector,
    private paymentService: PaymentService,
    private paymentDocumentService: PaymentDocumentService,
    private patientTreatmentProcessService: PatientTreatmentProcessService,
    public dialogService: DialogService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;

    forkJoin([
      this.patientTreatmentProcessService.getListByPatientId(+this.patient.id),
      this.paymentService.getList(this.ptpId)
    ]).subscribe(([
      resTreatmentProcess,
      resPaymentList
    ]) => {
      this.treatmentProcess = resTreatmentProcess.items.find(ptp=>+ptp.id == this.ptpId);
      this.paymentList = resPaymentList.items;
      if (this.treatmentProcess.treatmentProcessStatusId == this.preatmentTreatmentStatusEnum.PaymentCompletedTreatmentProcess) {
        this.onPaymentCompleted.emit();
      }
    });

    this.paymentService.getList(this.ptpId).subscribe({
      next: (res) => {
        this.paymentList = res.items;
      },
      complete: () => {
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
      }
    });
  }

  onNewPayment() {

    this.paymentDialogRef = this.dialogService.open(PaymentDialogComponent, {
      header: this.l('::PaymentDialog:Title'),
      width: '85vw',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        isRelatedWithProforma: false,
        patientName: this.patient.name + (this.patient.surname ? " " + this.patient.surname : ""),
        hospitalId: null,
        proformaCode: null,
        proformaId: null,
        ptpId: this.ptpId
      },
    });

    this.paymentDialogRef.onClose.subscribe(() => {
      this.fetchData();
    });
  }

  download(payment: ListPaymentDto) {
    this.paymentService.createInvoicePdfById(payment.id).subscribe({
      next: r => {
        const source = `data:application/pdf;base64,${r}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${payment.proformaNumber}_${payment.rowNumber}.pdf`
        link.click();
      }
    });
  }

  upload(paymentId: number) {
    this.paymentDocumentService.getByPayment(paymentId).subscribe(r => {
      if (r != null) {
        this.paymentDocument = r as SavePaymentDocumentDto;
        this.uploadedInvoices.push(this.dataURLtoFile(r.file, r.fileName, r.contentType));
        this.displayUploadInvoice = true;
      }
      else {
        this.paymentDocument = {} as SavePaymentDocumentDto;
        this.paymentDocument.paymentId = paymentId;
        this.displayUploadInvoice = true;
      }
    });
  }

  dataURLtoFile(base64, filename, type) {
    debugger;
    var mime = type,
      bstr = atob(base64),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }


  uploadInvoice() {

    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.uploadedInvoices[0]);
    fileReader.onload = (r) => {
      if (this.paymentDocument) {
        this.paymentDocument.fileName = this.uploadedInvoices[0].name;
        this.paymentDocument.file = fileReader.result as string;
        this.paymentDocument.contentType = this.uploadedInvoices[0].type;
        this.paymentDocumentService.save(this.paymentDocument).subscribe({
          next: (res) => {
            this.success(this.l('::Message:SuccessfulSave', this.l('::Payment:Invoices:NameSingular')));
            this.fetchData();
            this.hideUploadInvoiceDialog();
          }
        });
      }
    };
  }

  hideUploadInvoiceDialog() {
    this.paymentDocument = null;
    this.uploadedInvoices = [];
    this.displayUploadInvoice = false;
  }

  onSelect(event: any) {
    this.uploadedInvoices = [];
    for (let file of event.files) {
      this.uploadedInvoices.push(file);
    }
  }

  openFile(file: any) {
    const url = window.URL.createObjectURL(file);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  }

  removeFile() {
    this.uploadedInvoices = [];
    this.documentUpload.clear();
  }
}
