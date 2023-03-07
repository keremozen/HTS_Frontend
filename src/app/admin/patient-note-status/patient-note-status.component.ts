import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IPatientNoteStatus, PatientNoteStatus } from 'src/app/models/patientNoteStatus.model';
import { PatientNoteStatusService } from 'src/app/services/patientNoteStatus.service';

@Component({
  selector: 'app-patient-note-status',
  templateUrl: './patient-note-status.component.html',
  styleUrls: ['./patient-note-status.component.scss']
})
export class PatientNoteStatusComponent {
  patientNoteStatusDialog: boolean;
  patientNoteStatusList: IPatientNoteStatus[];
  patientNoteStatus: PatientNoteStatus;
  submitted: boolean;

  constructor(
    private patientNoteStatusService: PatientNoteStatusService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private l: LocalizationService
  ) { }

  ngOnInit() {
    this.patientNoteStatusService.getPatientNoteStatusList().subscribe(data => this.patientNoteStatusList = data);
  }

  openNewPatientNoteStatus() {
    this.patientNoteStatus = new PatientNoteStatus();
    this.submitted = false;
    this.patientNoteStatusDialog = true;
  }

  editPatientNoteStatus(patientNoteStatus: PatientNoteStatus) {
    this.patientNoteStatus = { ...patientNoteStatus };
    this.patientNoteStatusDialog = true;
  }

  deletePatientNoteStatus(patientNoteStatus: PatientNoteStatus) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + patientNoteStatus.Name + '?',
      header: this.l.instant('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientNoteStatusList = this.patientNoteStatusList.filter(val => val.Id !== patientNoteStatus.Id);
        this.patientNoteStatus = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patient Note Status Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.patientNoteStatusDialog = false;
    this.submitted = false;
  }

  savePatientNoteStatus() {
    this.submitted = true;
  }
}
