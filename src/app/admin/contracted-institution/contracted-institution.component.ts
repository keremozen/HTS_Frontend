import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IContractedInstitution, ContractedInstitution } from 'src/app/models/contractedInstitution.model';
import { ContractedInstitutionService } from 'src/app/services/contractedInstitution.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-contracted-institution',
  templateUrl: './contracted-institution.component.html',
  styleUrls: ['./contracted-institution.component.scss']
})
export class ContractedInstitutionComponent extends AppComponentBase {
  contractedInstitutionDialog: boolean;
  contractedInstitutionList: IContractedInstitution[];
  contractedInstitution: ContractedInstitution;
  submitted: boolean;

  constructor(
    injector: Injector,
    private contractedInstitutionService: ContractedInstitutionService,
    private messageService: MessageService
  ) {
    super(injector);
  }

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
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', contractedInstitution.Name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contractedInstitutionList = this.contractedInstitutionList.filter(val => val.Id !== contractedInstitution.Id);
        this.contractedInstitution = null;
        this.messageService.add({ severity: 'success', summary: this.l('::Message:Successful'), detail: this.l('::Message:SuccessfulDeletion', this.l('::Admin:ContractedInstitution:Name')), life: 3000 });
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
