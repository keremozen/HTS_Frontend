import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IPatientAdmissionMethod, PatientAdmissionMethod } from 'src/app/models/patientAdmissionMethod.model';
import { PatientAdmissionMethodService } from 'src/app/services/patientAdmissionMethod.service';

@Component({
  selector: 'app-patient-admission-method',
  templateUrl: './patient-admission-method.component.html',
  styleUrls: ['./patient-admission-method.component.scss']
})
export class PatientAdmissionMethodComponent {
  patientAdmissionMethodDialog: boolean;
  patientAdmissionMethodList: IPatientAdmissionMethod[];
  patientAdmissionMethod: PatientAdmissionMethod;
  submitted: boolean;

  constructor(
    private patientAdmissionMethodService: PatientAdmissionMethodService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private l: LocalizationService
  ) { }

  ngOnInit() {
    this.patientAdmissionMethodService.getPatientAdmissionMethodList().subscribe(data => this.patientAdmissionMethodList = data);
  }

  openNewPatientAdmissionMethod() {
    this.patientAdmissionMethod = new PatientAdmissionMethod();
    this.submitted = false;
    this.patientAdmissionMethodDialog = true;
  }

  editPatientAdmissionMethod(patientAdmissionMethod: PatientAdmissionMethod) {
    this.patientAdmissionMethod = { ...patientAdmissionMethod };
    this.patientAdmissionMethodDialog = true;
  }

  deletePatientAdmissionMethod(patientAdmissionMethod: PatientAdmissionMethod) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + patientAdmissionMethod.Name + '?',
      header: this.l.instant('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientAdmissionMethodList = this.patientAdmissionMethodList.filter(val => val.Id !== patientAdmissionMethod.Id);
        this.patientAdmissionMethod = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patient Admission Method Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.patientAdmissionMethodDialog = false;
    this.submitted = false;
  }

  savePatientAdmissionMethod() {
    this.submitted = true;
  }
}
