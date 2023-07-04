import { ThemeSharedTestingModule } from '@abp/ng.theme.shared/testing';
import { DatePipe } from '@angular/common';
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { CurrencyDto } from '@proxy/dto/currency';
import { HospitalDto } from '@proxy/dto/hospital';
import { SavePaymentDto } from '@proxy/dto/payment';
import { SavePaymentItemDto } from '@proxy/dto/payment-item';
import { PaymentKindDto } from '@proxy/dto/payment-kind';
import { PaymentReasonDto } from '@proxy/dto/payment-reason';
import { PaymentKindService, PaymentReasonService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PaymentDialogComponent extends AppComponentBase {

  hospitalList: HospitalDto[] = [];
  currencyList: CurrencyDto[] = [];
  selectedHospitalId: number;
  proformaNo: string;
  patientName: string;
  collectorName: string;
  paymentReasonList: PaymentReasonDto[] = [];
  paymentDate: string = (new DatePipe("tr-TR")).transform(new Date(), 'dd.MM.yyyy HH:mm');
  payment: SavePaymentDto;
  paymentItemDialog: boolean = false;
  paymentItem: SavePaymentItemWithDetail;
  paymentKindList: PaymentKindDto[] = [];
  rowNumber: number = 1;

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private paymentKindService: PaymentKindService,
    private paymentReasonService: PaymentReasonService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.payment = {} as SavePaymentDto;
    this.payment.paymentItems = this.payment.paymentItems as SavePaymentItemWithDetail[];
    this.payment.paymentItems = [];
    this.hospitalList = this.commonService.hospitalList;
    this.currencyList = this.commonService.currencyList;
    forkJoin([
      this.paymentKindService.getList(),
      this.paymentReasonService.getList(true)
    ]).subscribe(([
      resPaymentKind,
      resPaymentReason
    ]) => {
      this.paymentKindList = resPaymentKind.items;
      this.paymentReasonList = resPaymentReason.items;
    });
  }

  newPaymentItem() {
    this.paymentItem = {} as SavePaymentItemWithDetail;
    this.paymentItemDialog = true;
  }

  hidePaymentItemDialog() {
    this.paymentItem = null;
    this.paymentItemDialog = false;
  }

  savePaymentItem() {
    this.paymentItem.currency = this.currencyList.find(c => c.id == this.paymentItem.currencyId);
    this.paymentItem.currencyCode = this.paymentItem.currency.name == 'TL' ? 'TRY' : this.paymentItem.currency.name;
    this.paymentItem.paymentKind = this.paymentKindList.find(pk => pk.id == this.paymentItem.paymentKindId);
    this.payment.paymentItems.push(this.paymentItem);
    this.reorderItems()
    this.hidePaymentItemDialog();
  }

  deletePaymentItem(paymentItem: SavePaymentItemWithDetail) {
    this.payment.paymentItems = this.payment.paymentItems.filter((pi: SavePaymentItemWithDetail)=>pi.rowNumber !== paymentItem.rowNumber);
    this.reorderItems()
  }

  reorderItems() {
    this.rowNumber = 1;
    for (let index = 0; index < this.payment.paymentItems.length; index++) {
      var item = this.payment.paymentItems[index] as SavePaymentItemWithDetail;
      item.rowNumber = this.rowNumber++;
    }
  }

}

class SavePaymentItemWithDetail implements SavePaymentItemDto {
  paymentId: number;
  paymentKindId: number;
  posApproveCode?: string;
  bank?: string;
  queryNumber?: string;
  currencyId: number;
  price: number;
  currency: CurrencyDto;
  currencyCode: string;
  paymentKind: PaymentKindDto;
  rowNumber: number;
}
