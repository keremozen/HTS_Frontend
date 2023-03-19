import { Component, Injector } from '@angular/core';
import { IPatientNoteStatus, PatientNoteStatus } from 'src/app/models/patientNoteStatus.model';
import { PatientNoteStatusService } from 'src/app/services/patientNoteStatus.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient-note-status',
  templateUrl: './patient-note-status.component.html',
  styleUrls: ['./patient-note-status.component.scss']
})
export class PatientNoteStatusComponent extends AppComponentBase {
  patientNoteStatusDialog: boolean;
  patientNoteStatusList: IPatientNoteStatus[];
  patientNoteStatus: PatientNoteStatus;
  submitted: boolean;

  constructor(
    injector: Injector,
    private patientNoteStatusService: PatientNoteStatusService
  ) { 
    super(injector)
  }

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
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', patientNoteStatus.Name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientNoteStatusList = this.patientNoteStatusList.filter(val => val.Id !== patientNoteStatus.Id);
        this.patientNoteStatus = null;
        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:PatientNoteStatus:Name')));
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
