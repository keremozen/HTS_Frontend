import { Component, Injector } from '@angular/core';
import { MaterialDto, SaveMaterialDto } from '@proxy/dto/material';
import { MaterialService } from '@proxy/service/material.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class MaterialComponent extends AppComponentBase {

    materialDialog: boolean;
    materialList: MaterialDto[];
    material: SaveMaterialDto;
    isEdit: boolean;
    materialToBeEdited: MaterialDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private materialService: MaterialService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.materialService.getList().subscribe({
          next: data => {
            this.materialList = data.items;
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

    openNewMaterial() {
        this.isEdit = false;
        this.material = {} as SaveMaterialDto;
        this.material.isActive = true;
        this.materialDialog = true;
    }

    editMaterial(material: MaterialDto) {
        this.isEdit = true;
        this.materialToBeEdited = material;
        this.material = { ...material as SaveMaterialDto };
        this.materialDialog = true;
    }

    deleteMaterial(material: MaterialDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', material.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.materialService.delete(material.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:Material:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveMaterial() {
        if (!this.isEdit) {
            this.materialService.create(this.material).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Material:Name')));
                }
            });
        }
        else {
            this.materialService.update(this.materialToBeEdited.id, this.material).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Material:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.material = null;
        this.materialToBeEdited = null;
        this.materialDialog = false;
    }

}
