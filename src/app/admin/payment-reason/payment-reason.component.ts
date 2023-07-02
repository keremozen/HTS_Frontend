import { Component, Injector } from '@angular/core';
import { PaymentReasonDto, SavePaymentReasonDto } from '@proxy/dto/payment-reason';
import { PaymentReasonService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-payment-reason',
    templateUrl: './payment-reason.component.html',
    styleUrls: ['./payment-reason.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class PaymentReasonComponent extends AppComponentBase {

    paymentReasonDialog: boolean;
    paymentReasonList: PaymentReasonDto[];
    paymentReason: SavePaymentReasonDto;
    isEdit: boolean;
    paymentReasonToBeEdited: PaymentReasonDto;
    loading: boolean;

    constructor(
        injector: Injector,
        private paymentReasonService: PaymentReasonService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.paymentReasonService.getList().subscribe({
          next: data => {
            this.paymentReasonList = data.items;
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
    }

    openNewPaymentReason() {
        this.isEdit = false;
        this.paymentReason = {} as SavePaymentReasonDto;
        this.paymentReason.isActive = true;
        this.paymentReasonDialog = true;
    }

    editPaymentReason(paymentReason: PaymentReasonDto) {
        this.isEdit = true;
        this.paymentReasonToBeEdited = paymentReason;
        this.paymentReason = { ...paymentReason as SavePaymentReasonDto };
        this.paymentReasonDialog = true;
    }

    deletePaymentReason(paymentReason: PaymentReasonDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', paymentReason.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.paymentReasonService.delete(paymentReason.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:PaymentReason:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    savePaymentReason() {
        if (!this.isEdit) {
            this.paymentReasonService.create(this.paymentReason).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:PaymentReason:Name')));
                }
            });
        }
        else {
            this.paymentReasonService.update(this.paymentReasonToBeEdited.id, this.paymentReason).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:PaymentReason:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.paymentReason = null;
        this.paymentReasonToBeEdited = null;
        this.paymentReasonDialog = false;
    }

}
