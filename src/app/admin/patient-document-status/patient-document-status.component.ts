import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IPatientDocumentStatus, PatientDocumentStatus } from 'src/app/models/patientDocumentStatus.model';
import { PatientDocumentStatusService } from 'src/app/services/patientDocumentStatus.service';

@Component({
  selector: 'app-patient-document-status',
  templateUrl: './patient-document-status.component.html',
  styleUrls: ['./patient-document-status.component.scss']
})
export class PatientDocumentStatusComponent {
  patientDocumentStatusDialog: boolean;
  patientDocumentStatusList: IPatientDocumentStatus[];
  patientDocumentStatus: PatientDocumentStatus;
  submitted: boolean;

  constructor(
    private patientDocumentStatusService: PatientDocumentStatusService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private l: LocalizationService
  ) { }

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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + patientDocumentStatus.Name + '?',
      header: this.l.instant('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientDocumentStatusList = this.patientDocumentStatusList.filter(val => val.Id !== patientDocumentStatus.Id);
        this.patientDocumentStatus = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patient Document Status Deleted', life: 3000 });
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
