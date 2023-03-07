import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IContractedInstitution, ContractedInstitution } from 'src/app/models/contractedInstitution.model';
import { ContractedInstitutionService } from 'src/app/services/contractedInstitution.service';

@Component({
  selector: 'app-contracted-institution',
  templateUrl: './contracted-institution.component.html',
  styleUrls: ['./contracted-institution.component.scss']
})
export class ContractedInstitutionComponent {
  contractedInstitutionDialog: boolean;
  contractedInstitutionList: IContractedInstitution[];
  contractedInstitution: ContractedInstitution;
  submitted: boolean;

  constructor(
    private contractedInstitutionService: ContractedInstitutionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private l: LocalizationService
  ) { }

  ngOnInit() {
    this.contractedInstitutionService.getContractedInstitutionList().subscribe(data => this.contractedInstitutionList = data);
  }

  openNewContractedInstitution() {
    this.contractedInstitution = new ContractedInstitution();
    this.submitted = false;
    this.contractedInstitutionDialog = true;
  }

  editContractedInstitution(contractedInstitution: ContractedInstitution) {
    this.contractedInstitution = { ...contractedInstitution };
    this.contractedInstitutionDialog = true;
  }

  deleteContractedInstitution(contractedInstitution: ContractedInstitution) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + contractedInstitution.Name + '?',
      header: this.l.instant('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contractedInstitutionList = this.contractedInstitutionList.filter(val => val.Id !== contractedInstitution.Id);
        this.contractedInstitution = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contracted Institution Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.contractedInstitutionDialog = false;
    this.submitted = false;
  }

  saveContractedInstitution() {
    this.submitted = true;
  }
}
