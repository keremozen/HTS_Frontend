import { Component, Injector } from '@angular/core';
import { SaveHospitalizationTypeDto, HospitalizationTypeDto } from '@proxy/dto/hospitalization-type';
import { HospitalizationTypeService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-hospitalization-type',
    templateUrl: './hospitalization-type.component.html',
    styleUrls: ['./hospitalization-type.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class HospitalizationTypeComponent extends AppComponentBase {

    hospitalizationTypeDialog: boolean;
    hospitalizationTypeList: HospitalizationTypeDto[];
    hospitalizationType: SaveHospitalizationTypeDto;
    isEdit: boolean;
    hospitalizationTypeToBeEdited: HospitalizationTypeDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private hospitalizationTypeService: HospitalizationTypeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.hospitalizationTypeService.getList().subscribe({
          next: data => {
            this.hospitalizationTypeList = data.items;
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

    openNewHospitalizationType() {
        this.isEdit = false;
        this.hospitalizationType = {} as SaveHospitalizationTypeDto;
        this.hospitalizationType.isActive = true;
        this.hospitalizationTypeDialog = true;
    }

    editHospitalizationType(hospitalizationType: HospitalizationTypeDto) {
        this.isEdit = true;
        this.hospitalizationTypeToBeEdited = hospitalizationType;
        this.hospitalizationType = { ...hospitalizationType as SaveHospitalizationTypeDto };
        this.hospitalizationTypeDialog = true;
    }


    deleteHospitalizationType(hospitalizationType: HospitalizationTypeDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', hospitalizationType.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hospitalizationTypeService.delete(hospitalizationType.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:HospitalizationType:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveHospitalizationType() {
        if (!this.isEdit) {
            this.hospitalizationTypeService.create(this.hospitalizationType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalizationType:Name')));
                }
            });
        }
        else {
            this.hospitalizationTypeService.update(this.hospitalizationTypeToBeEdited.id, this.hospitalizationType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalizationType:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.hospitalizationType = null;
        this.hospitalizationTypeToBeEdited = null;
        this.hospitalizationTypeDialog = false;
    }

}
