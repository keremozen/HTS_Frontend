import { Component, Injector } from '@angular/core';
import { ContractedInstitutionKindDto, SaveContractedInstitutionKindDto } from '@proxy/dto/contracted-institution-kind';
import { ContractedInstitutionKindService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-contracted-institution-kind',
    templateUrl: './contracted-institution-kind.component.html',
    styleUrls: ['./contracted-institution-kind.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class ContractedInstitutionKindComponent extends AppComponentBase {

    contractedInstitutionKindDialog: boolean;
    contractedInstitutionKindList: ContractedInstitutionKindDto[];
    contractedInstitutionKind: SaveContractedInstitutionKindDto;
    isEdit: boolean;
    contractedInstitutionKindToBeEdited: ContractedInstitutionKindDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private contractedInstitutionKindService: ContractedInstitutionKindService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.contractedInstitutionKindService.getList().subscribe({
          next: data => {
            this.contractedInstitutionKindList = data.items;
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

    openNewContractedInstitutionKind() {
        this.isEdit = false;
        this.contractedInstitutionKind = {} as SaveContractedInstitutionKindDto;
        this.contractedInstitutionKind.isActive = true;
        this.contractedInstitutionKindDialog = true;
    }

    editContractedInstitutionKind(contractedInstitutionKind: ContractedInstitutionKindDto) {
        this.isEdit = true;
        this.contractedInstitutionKindToBeEdited = contractedInstitutionKind;
        this.contractedInstitutionKind = { ...contractedInstitutionKind as SaveContractedInstitutionKindDto };
        this.contractedInstitutionKindDialog = true;
    }

    deleteContractedInstitutionKind(contractedInstitutionKind: ContractedInstitutionKindDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', contractedInstitutionKind.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.contractedInstitutionKindService.delete(contractedInstitutionKind.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:ContractedInstitutionKind:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveContractedInstitutionKind() {
        if (!this.isEdit) {
            this.contractedInstitutionKindService.create(this.contractedInstitutionKind).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitutionKind:Name')));
                }
            });
        }
        else {
            this.contractedInstitutionKindService.update(this.contractedInstitutionKindToBeEdited.id, this.contractedInstitutionKind).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitutionKind:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.contractedInstitutionKind = null;
        this.contractedInstitutionKindToBeEdited = null;
        this.contractedInstitutionKindDialog = false;
    }

}
