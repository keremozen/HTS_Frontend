import { Component, Injector } from '@angular/core';
import { SaveProcessTypeDto, ProcessTypeDto } from '@proxy/dto/process-type';
import { ProcessTypeService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-process-type',
    templateUrl: './process-type.component.html',
    styleUrls: ['./process-type.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class ProcessTypeComponent extends AppComponentBase {

    processTypeDialog: boolean;
    processTypeList: ProcessTypeDto[];
    processType: SaveProcessTypeDto;
    isEdit: boolean;
    processTypeToBeEdited: ProcessTypeDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private processTypeService: ProcessTypeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.processTypeService.getList().subscribe({
          next: data => {
            this.processTypeList = data.items;
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

    openNewProcessType() {
        this.isEdit = false;
        this.processType = {} as SaveProcessTypeDto;
        this.processType.isActive = true;
        this.processTypeDialog = true;
    }

    editProcessType(processType: ProcessTypeDto) {
        this.isEdit = true;
        this.processTypeToBeEdited = processType;
        this.processType = { ...processType as SaveProcessTypeDto };
        this.processTypeDialog = true;
    }


    deleteProcessType(processType: ProcessTypeDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', processType.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.processTypeService.delete(processType.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:ProcessType:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveProcessType() {
        if (!this.isEdit) {
            this.processTypeService.create(this.processType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ProcessType:Name')));
                }
            });
        }
        else {
            this.processTypeService.update(this.processTypeToBeEdited.id, this.processType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ProcessType:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.processType = null;
        this.processTypeToBeEdited = null;
        this.processTypeDialog = false;
    }

}
