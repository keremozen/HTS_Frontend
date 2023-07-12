import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { OperationService, PaymentService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { ListPaymentDto } from '@proxy/dto/payment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { EntityEnum_OperationTypeEnum } from '@proxy/enum';
import { ProformaPricingListDto } from '@proxy/dto/proforma';
import { PatientDto } from '@proxy/dto/patient';

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
  ref: DynamicDialogRef;

  public operationTypeEnum = EntityEnum_OperationTypeEnum;

  constructor(
    injector: Injector,
    private paymentService: PaymentService,
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

    this.ref = this.dialogService.open(PaymentDialogComponent, {
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

    this.ref.onClose.subscribe(() => {
      this.fetchData();
    });
  }
}
