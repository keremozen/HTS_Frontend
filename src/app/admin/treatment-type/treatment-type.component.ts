import { Component, Injector } from '@angular/core';
import { SaveTreatmentTypeDto, TreatmentTypeDto } from '@proxy/dto/treatment-type';
import { TreatmentTypeService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-treatment-type',
    templateUrl: './treatment-type.component.html',
    styleUrls: ['./treatment-type.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class TreatmentTypeComponent extends AppComponentBase {

    treatmentTypeDialog: boolean;
    treatmentTypeList: TreatmentTypeDto[];
    treatmentType: SaveTreatmentTypeDto;
    isEdit: boolean;
    treatmentTypeToBeEdited: TreatmentTypeDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private treatmentTypeService: TreatmentTypeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.treatmentTypeService.getList().subscribe({
          next: data => {
            this.treatmentTypeList = data.items;
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

    openNewTreatmentType() {
        this.isEdit = false;
        this.treatmentType = {} as SaveTreatmentTypeDto;
        this.treatmentType.isActive = true;
        this.treatmentTypeDialog = true;
    }

    editTreatmentType(treatmentType: TreatmentTypeDto) {
        this.isEdit = true;
        this.treatmentTypeToBeEdited = treatmentType;
        this.treatmentType = { ...treatmentType as SaveTreatmentTypeDto };
        this.treatmentTypeDialog = true;
    }


    deleteTreatmentType(treatmentType: TreatmentTypeDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', treatmentType.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.treatmentTypeService.delete(treatmentType.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:TreatmentType:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveTreatmentType() {
        if (!this.isEdit) {
            this.treatmentTypeService.create(this.treatmentType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:TreatmentType:Name')));
                }
            });
        }
        else {
            this.treatmentTypeService.update(this.treatmentTypeToBeEdited.id, this.treatmentType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:TreatmentType:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.treatmentType = null;
        this.treatmentTypeToBeEdited = null;
        this.treatmentTypeDialog = false;
    }

}
