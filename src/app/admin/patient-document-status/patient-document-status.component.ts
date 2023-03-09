import { LocalizationService } from '@abp/ng.core';
import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IPatientDocumentStatus, PatientDocumentStatus } from 'src/app/models/patientDocumentStatus.model';
import { PatientDocumentStatusService } from 'src/app/services/patientDocumentStatus.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient-document-status',
  templateUrl: './patient-document-status.component.html',
  styleUrls: ['./patient-document-status.component.scss']
})
export class PatientDocumentStatusComponent extends AppComponentBase {
  patientDocumentStatusDialog: boolean;
  patientDocumentStatusList: IPatientDocumentStatus[];
  patientDocumentStatus: PatientDocumentStatus;
  submitted: boolean;

  constructor(
    injector: Injector,
    private patientDocumentStatusService: PatientDocumentStatusService,
    private messageService: MessageService
  ) { 
    super(injector);
  }

  ngOnInit() {
    this.patientDocumentStatusService.getPatientDocumentStatusList().subscribe(data => this.patientDocumentStatusList = data);
  }

  openNewPatientDocumentStatus() {
    this.patientDocumentStatus = new PatientDocumentStatus();
    this.submitted = false;
    this.patientDocumentStatusDialog = true;
  }

  editPatientDocumentStatus(patientDocumentStatus: PatientDocumentStatus) {
    this.patientDocumentStatus = { ...patientDocumentStatus };
    this.patientDocumentStatusDialog = true;
  }

  deletePatientDocumentStatus(patientDocumentStatus: PatientDocumentStatus) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', patientDocumentStatus.Name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientDocumentStatusList = this.patientDocumentStatusList.filter(val => val.Id !== patientDocumentStatus.Id);
        this.patientDocumentStatus = null;
        this.messageService.add({ severity: 'success', summary: this.l('::Message:Successful'), detail: this.l('::Message:SuccessfulDeletion', this.l('::Admin:PatientDocumentStatus:Name')), life: 3000 });
      }
    });
  }

  hideDialog() {
    this.patientDocumentStatusDialog = false;
    this.submitted = false;
  }

  savePatientDocumentStatus() {
    this.submitted = true;
  }
}
