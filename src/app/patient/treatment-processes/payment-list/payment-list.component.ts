import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { PaymentService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { ListPaymentDto } from '@proxy/dto/payment';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentListComponent extends AppComponentBase {
  @Input() ptpId: number;
  paymentList: ListPaymentDto[] = [];
  totalCount: number = 0;
  loading: boolean = false;

  constructor(
    injector: Injector,
    private paymentService: PaymentService
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
    
  }
}
