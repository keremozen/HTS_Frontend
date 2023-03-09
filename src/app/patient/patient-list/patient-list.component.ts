import { Component, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})

export class PatientListComponent extends AppComponentBase {

  patientList: any[] = [];
  patient: any;
  submitted: boolean;

  constructor(
    injector: Injector,
    private messageService: MessageService
  ) {
    super(injector);

  }

  ngOnInit() {

  }

  openNewPatient() {
    //this.patient = new Patient();
    /*this.submitted = false;
    this.hospitalDialog = true*/;
  }


  editPatient(patient: any) {
    /*this.hospital = { ...hospital };
    this.hospitalDialog = true;*/
  }

  deletePatient(patient: any) {
    /*this.confirm({
        message: this.l('::Message:DeleteConfirmation', hospital.Name),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.hospitalList = this.hospitalList.filter(val => val.Id !== hospital.Id);
            this.hospital = null;
            this.messageService.add({ severity: 'success', summary: this.l('::Message:Successful'), detail: this.l('::Message:SuccessfulDeletion', this.l('::Admin:Hospital:Name')), life: 3000 });
        }
    });*/
  }

  hideDialog() {
    /* this.hospitalDialog = false;
     this.submitted = false;*/
  }

  savePatient() {
    //this.submitted = true;
  }
}
