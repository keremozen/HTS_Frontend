import { Component, Injector } from '@angular/core';
import { ProcessKindDto, SaveProcessKindDto } from '@proxy/dto/process-kind';
import { ProcessKindService } from '@proxy/service';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-process-kind',
    templateUrl: './process-kind.component.html',
    styleUrls: ['./process-kind.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class ProcessKindComponent extends AppComponentBase {

    processKindDialog: boolean;
    processKindList: ProcessKindDto[];
    processKind: SaveProcessKindDto;
    isEdit: boolean;
    processKindToBeEdited: ProcessKindDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private processKindService: ProcessKindService,
        private commonService: CommonService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.processKindService.getList().subscribe({
          next: data => {
            this.processKindList = data.items;
            this.commonService.processKindList = this.processKindList.filter(l=>l.isActive == true);
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
    }

    openNewProcessKind() {
        this.isEdit = false;
        this.processKind = {} as SaveProcessKindDto;
        this.processKind.isActive = true;
        this.processKindDialog = true;
    }

    editProcessKind(processKind: ProcessKindDto) {
        this.isEdit = true;
        this.processKindToBeEdited = processKind;
        this.processKind = { ...processKind as SaveProcessKindDto };
        this.processKindDialog = true;
    }

    deleteProcessKind(processKind: ProcessKindDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', processKind.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.processKindService.delete(processKind.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:ProcessKind:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveProcessKind() {
        if (!this.isEdit) {
            this.processKindService.create(this.processKind).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ProcessKind:Name')));
                }
            });
        }
        else {
            this.processKindService.update(this.processKindToBeEdited.id, this.processKind).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ProcessKind:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.processKind = null;
        this.processKindToBeEdited = null;
        this.processKindDialog = false;
    }

}
