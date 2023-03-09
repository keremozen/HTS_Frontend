import { LocalizationService } from '@abp/ng.core';
import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IPatientAdmissionMethod, PatientAdmissionMethod } from 'src/app/models/patientAdmissionMethod.model';
import { PatientAdmissionMethodService } from 'src/app/services/patientAdmissionMethod.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient-admission-method',
  templateUrl: './patient-admission-method.component.html',
  styleUrls: ['./patient-admission-method.component.scss']
})
export class PatientAdmissionMethodComponent extends AppComponentBase {
  patientAdmissionMethodDialog: boolean;
  patientAdmissionMethodList: IPatientAdmissionMethod[];
  patientAdmissionMethod: PatientAdmissionMethod;
  submitted: boolean;

  constructor(
    injector: Injector,
    private patientAdmissionMethodService: PatientAdmissionMethodService,
    private messageService: MessageService
  ) {
    super(injector);
  }

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
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', patientAdmissionMethod.Name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientAdmissionMethodList = this.patientAdmissionMethodList.filter(val => val.Id !== patientAdmissionMethod.Id);
        this.patientAdmissionMethod = null;
        this.messageService.add({ severity: 'success', summary: this.l('::Message:Successful'), detail: this.l('::Message:SuccessfulDeletion', this.l('::Admin:PatientAdmissionMethod:Name')), life: 3000 });
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
