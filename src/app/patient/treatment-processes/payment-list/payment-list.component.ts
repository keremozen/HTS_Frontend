import { Component, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { PaymentDocumentService, PaymentService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { ListPaymentDto } from '@proxy/dto/payment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { EntityEnum_OperationTypeEnum } from '@proxy/enum';
import { PatientDto } from '@proxy/dto/patient';
import { FileUpload } from 'primeng/fileupload';
import { SavePaymentDocumentDto } from '@proxy/dto/payment-document';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentListComponent extends AppComponentBase {
  @Input() ptpId: number;
  @Input() patient: PatientDto;
  paymentList: ListPaymentDto[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  paymentDialogRef: DynamicDialogRef;
  displayUploadInvoice: boolean = false;
  uploadedInvoices: any[] = [];
  paymentDocument: SavePaymentDocumentDto;
  @ViewChild("invoices", { static: false }) documentUpload: FileUpload;

  public operationTypeEnum = EntityEnum_OperationTypeEnum;

  constructor(
    injector: Injector,
    private paymentService: PaymentService,
    private paymentDocumentService: PaymentDocumentService,
    public dialogService: DialogService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.paymentService.getList(this.ptpId).subscribe({
      next: (res) => {
        this.paymentList = res.items;
        this.totalCount = res.totalCount;
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
    //TODO: Kerem Burada payment document payment id ile kontrol edilecek. Varsa o set edilecek.
    this.paymentDocument = {} as SavePaymentDocumentDto;
    this.paymentDocument.paymentId = paymentId;
    this.displayUploadInvoice = true;
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
