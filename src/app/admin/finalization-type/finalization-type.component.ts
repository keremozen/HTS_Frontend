import { Component, Injector } from '@angular/core';
import { FinalizationTypeDto, SaveFinalizationTypeDto } from '@proxy/dto/finalization-type';
import { FinalizationTypeService } from '@proxy/service';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-finalization-type',
    templateUrl: './finalization-type.component.html',
    styleUrls: ['./finalization-type.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class FinalizationTypeComponent extends AppComponentBase {

    finalizationTypeDialog: boolean;
    finalizationTypeList: FinalizationTypeDto[];
    finalizationType: SaveFinalizationTypeDto;
    isEdit: boolean;
    finalizationTypeToBeEdited: FinalizationTypeDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private finalizationTypeService: FinalizationTypeService,
        private commonService: CommonService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.finalizationTypeService.getList().subscribe({
          next: data => {
            this.finalizationTypeList = data.items;
            this.totalRecords = data.items.length;
            this.commonService.finalizationTypeList = this.finalizationTypeList;
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
    }

    openNewFinalizationType() {
        this.isEdit = false;
        this.finalizationType = {} as SaveFinalizationTypeDto;
        this.finalizationTypeDialog = true;
    }


    editFinalizationType(finalizationType: FinalizationTypeDto) {
        this.isEdit = true;
        this.finalizationTypeToBeEdited = finalizationType;
        this.finalizationType = { ...finalizationType as SaveFinalizationTypeDto };
        this.finalizationTypeDialog = true;
    }


    deleteFinalizationType(finalizationType: FinalizationTypeDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', finalizationType.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.finalizationTypeService.delete(finalizationType.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:FinalizationType:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveFinalizationType() {
        if (!this.isEdit) {
            this.finalizationTypeService.create(this.finalizationType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:FinalizationType:Name')));
                }
            });
        }
        else {
            this.finalizationTypeService.update(this.finalizationTypeToBeEdited.id, this.finalizationType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:FinalizationType:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.finalizationType = null;
        this.finalizationTypeToBeEdited = null;
        this.finalizationTypeDialog = false;
    }

}
