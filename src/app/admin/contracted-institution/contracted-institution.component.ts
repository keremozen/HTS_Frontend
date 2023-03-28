import { Component, Injector } from '@angular/core';
import { SaveContractedInstitutionDto } from '@proxy';
import { ContractedInstitutionDto } from '@proxy/dto/contracted-institution';
import { ContractedInstitutionService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-contracted-institution',
  templateUrl: './contracted-institution.component.html',
  styleUrls: ['./contracted-institution.component.scss']
})
export class ContractedInstitutionComponent extends AppComponentBase {
  contractedInstitutionDialog: boolean;
  contractedInstitutionList: ContractedInstitutionDto[];
  contractedInstitution: SaveContractedInstitutionDto;
  isEdit: boolean;
  contractedInstitutionToBeEdited: ContractedInstitutionDto;
  loading: boolean;
  totalRecords: number = 0;

  constructor(
    injector: Injector,
    private contractedInstitutionService: ContractedInstitutionService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.contractedInstitutionService.getList().subscribe({
      next: data => {
        this.contractedInstitutionList = data.items;
        this.totalRecords = data.totalCount;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openNewContractedInstitution() {
    this.isEdit = false;
    this.contractedInstitution = {} as SaveContractedInstitutionDto;
    this.contractedInstitution.isActive = true;
    this.contractedInstitutionDialog = true;
  }

  editContractedInstitution(contractedInstitution: ContractedInstitutionDto) {
    this.isEdit = true;
    this.contractedInstitutionToBeEdited = contractedInstitution;
    this.contractedInstitution = { ...contractedInstitution as SaveContractedInstitutionDto };
    this.contractedInstitutionDialog = true;
  }

  deleteContractedInstitution(contractedInstitution: ContractedInstitutionDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', contractedInstitution.name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contractedInstitutionService.delete(contractedInstitution.id).subscribe({
          next: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:ContractedInstitution:Name')));
            this.fetchData();
            this.hideDialog();
          }
        });
      }
    });
  }

  saveContractedInstitution() {
    if (!this.isEdit) {
      this.contractedInstitutionService.create(this.contractedInstitution).subscribe({
        next: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitution:Name')));
        },
        error: (error: any) => {
          this.hideDialog();
        }
      });
    }
    else {
      this.contractedInstitutionService.update(this.contractedInstitutionToBeEdited.id, this.contractedInstitution).subscribe({
        next: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitution:Name')));
        },
        error: (error: any) => {
          this.hideDialog();
        }
      });
    }
  }

  hideDialog() {
    this.contractedInstitution = null;
    this.contractedInstitutionToBeEdited = null;
    this.contractedInstitutionDialog = false;
  }


}
