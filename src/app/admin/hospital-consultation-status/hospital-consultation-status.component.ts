import { LocalizationService } from '@abp/ng.core';
import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IHospitalConsultationStatus, HospitalConsultationStatus } from 'src/app/models/hospitalConsultationStatus.model';
import { HospitalConsultationStatusService } from 'src/app/services/hospitalConsultationStatus.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-hospital-consultation-status',
  templateUrl: './hospital-consultation-status.component.html',
  styleUrls: ['./hospital-consultation-status.component.scss']
})
export class HospitalConsultationStatusComponent extends AppComponentBase {
  hospitalConsultationStatusDialog: boolean;
  hospitalConsultationStatusList: IHospitalConsultationStatus[];
  hospitalConsultationStatus: HospitalConsultationStatus;
  submitted: boolean;

  constructor(
    injector: Injector,
    private hospitalConsultationStatusService: HospitalConsultationStatusService,
    private messageService: MessageService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.hospitalConsultationStatusService.getHospitalConsultationStatusList().subscribe(data => this.hospitalConsultationStatusList = data);
  }

  openNewHospitalConsultationStatus() {
    this.hospitalConsultationStatus = new HospitalConsultationStatus();
    this.submitted = false;
    this.hospitalConsultationStatusDialog = true;
  }

  editHospitalConsultationStatus(hospitalConsultationStatus: HospitalConsultationStatus) {
    this.hospitalConsultationStatus = { ...hospitalConsultationStatus };
    this.hospitalConsultationStatusDialog = true;
  }

  deleteHospitalConsultationStatus(hospitalConsultationStatus: HospitalConsultationStatus) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', hospitalConsultationStatus.Name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hospitalConsultationStatusList = this.hospitalConsultationStatusList.filter(val => val.Id !== hospitalConsultationStatus.Id);
        this.hospitalConsultationStatus = null;
        this.messageService.add({ severity: 'success', summary: this.l('::Message:Successful'), detail: this.l('::Message:SuccessfulDeletion', this.l('::Admin:HospitalConsultationStatus:Name')), life: 3000 });
      }
    });
  }

  hideDialog() {
    this.hospitalConsultationStatusDialog = false;
    this.submitted = false;
  }

  saveHospitalConsultationStatus() {
    this.submitted = true;
  }
}
