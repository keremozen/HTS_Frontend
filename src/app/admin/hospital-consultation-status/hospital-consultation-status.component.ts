import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IHospitalConsultationStatus, HospitalConsultationStatus } from 'src/app/models/hospitalConsultationStatus.model';
import { HospitalConsultationStatusService } from 'src/app/services/hospitalConsultationStatus.service';

@Component({
  selector: 'app-hospital-consultation-status',
  templateUrl: './hospital-consultation-status.component.html',
  styleUrls: ['./hospital-consultation-status.component.scss']
})
export class HospitalConsultationStatusComponent {
  hospitalConsultationStatusDialog: boolean;
  hospitalConsultationStatusList: IHospitalConsultationStatus[];
  hospitalConsultationStatus: HospitalConsultationStatus;
  submitted: boolean;

  constructor(
    private hospitalConsultationStatusService: HospitalConsultationStatusService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private l: LocalizationService
  ) { }

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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + hospitalConsultationStatus.Name + '?',
      header: this.l.instant('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hospitalConsultationStatusList = this.hospitalConsultationStatusList.filter(val => val.Id !== hospitalConsultationStatus.Id);
        this.hospitalConsultationStatus = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Hospital Consultation Status Deleted', life: 3000 });
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
