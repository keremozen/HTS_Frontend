import { Component, Injector } from '@angular/core';
import { ContractedInstitutionTypeDto, SaveContractedInstitutionTypeDto } from '@proxy/dto/contracted-institution-type';
import { ContractedInstitutionTypeService } from '@proxy/service';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-contracted-institution-type',
    templateUrl: './contracted-institution-type.component.html',
    styleUrls: ['./contracted-institution-type.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class ContractedInstitutionTypeComponent extends AppComponentBase {

    contractedInstitutionTypeDialog: boolean;
    contractedInstitutionTypeList: ContractedInstitutionTypeDto[];
    contractedInstitutionType: SaveContractedInstitutionTypeDto;
    isEdit: boolean;
    contractedInstitutionTypeToBeEdited: ContractedInstitutionTypeDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private contractedInstitutionTypeService: ContractedInstitutionTypeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.contractedInstitutionTypeService.getList().subscribe({
          next: data => {
            this.contractedInstitutionTypeList = data.items;
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

    openNewContractedInstitutionType() {
        this.isEdit = false;
        this.contractedInstitutionType = {} as SaveContractedInstitutionTypeDto;
        this.contractedInstitutionType.isActive = true;
        this.contractedInstitutionTypeDialog = true;
    }

    editContractedInstitutionType(contractedInstitutionType: ContractedInstitutionTypeDto) {
        this.isEdit = true;
        this.contractedInstitutionTypeToBeEdited = contractedInstitutionType;
        this.contractedInstitutionType = { ...contractedInstitutionType as SaveContractedInstitutionTypeDto };
        this.contractedInstitutionTypeDialog = true;
    }

    deleteContractedInstitutionType(contractedInstitutionType: ContractedInstitutionTypeDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', contractedInstitutionType.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.contractedInstitutionTypeService.delete(contractedInstitutionType.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:ContractedInstitutionType:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveContractedInstitutionType() {
        if (!this.isEdit) {
            this.contractedInstitutionTypeService.create(this.contractedInstitutionType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitutionType:Name')));
                }
            });
        }
        else {
            this.contractedInstitutionTypeService.update(this.contractedInstitutionTypeToBeEdited.id, this.contractedInstitutionType).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitutionType:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.contractedInstitutionType = null;
        this.contractedInstitutionTypeToBeEdited = null;
        this.contractedInstitutionTypeDialog = false;
    }

}
