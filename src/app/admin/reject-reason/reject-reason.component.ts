import { Component, Injector } from '@angular/core';
import { RejectReasonDto, SaveRejectReasonDto } from '@proxy/dto/reject-reason';
import { RejectReasonService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-reject-reason',
    templateUrl: './reject-reason.component.html',
    styleUrls: ['./reject-reason.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class RejectReasonComponent extends AppComponentBase {

    rejectReasonDialog: boolean;
    rejectReasonList: RejectReasonDto[];
    rejectReason: SaveRejectReasonDto;
    isEdit: boolean;
    rejectReasonToBeEdited: RejectReasonDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private rejectReasonService: RejectReasonService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.rejectReasonService.getList().subscribe({
          next: data => {
            this.rejectReasonList = data.items;
            this.totalRecords = data.totalCount;
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
    }

    openNewRejectReason() {
        this.isEdit = false;
        this.rejectReason = {} as SaveRejectReasonDto;
        this.rejectReason.isActive = true;
        this.rejectReasonDialog = true;
    }

    editRejectReason(rejectReason: RejectReasonDto) {
        this.isEdit = true;
        this.rejectReasonToBeEdited = rejectReason;
        this.rejectReason = { ...rejectReason as SaveRejectReasonDto };
        this.rejectReasonDialog = true;
    }

    deleteRejectReason(rejectReason: RejectReasonDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', rejectReason.reason),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.rejectReasonService.delete(rejectReason.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:RejectReason:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveRejectReason() {
        if (!this.isEdit) {
            this.rejectReasonService.create(this.rejectReason).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:RejectReason:Name')));
                }
            });
        }
        else {
            this.rejectReasonService.update(this.rejectReasonToBeEdited.id, this.rejectReason).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:RejectReason:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.rejectReason = null;
        this.rejectReasonToBeEdited = null;
        this.rejectReasonDialog = false;
    }

}
