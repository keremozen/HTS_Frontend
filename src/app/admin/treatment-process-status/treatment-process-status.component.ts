import { LocalizationService } from '@abp/ng.core';
import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ITreatmentProcessStatus, TreatmentProcessStatus } from 'src/app/models/treatmentProcessStatus.model';
import { TreatmentProcessStatusService } from 'src/app/services/treatmentProcessStatus.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-treatment-process-status',
  templateUrl: './treatment-process-status.component.html',
  styleUrls: ['./treatment-process-status.component.scss']
})
export class TreatmentProcessStatusComponent extends AppComponentBase {
  treatmentProcessStatusDialog: boolean;
  treatmentProcessStatusList: ITreatmentProcessStatus[];
  treatmentProcessStatus: TreatmentProcessStatus;
  submitted: boolean;

  constructor(
    injector: Injector,
    private treatmentProcessStatusService: TreatmentProcessStatusService,
    private messageService: MessageService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.treatmentProcessStatusService.getTreatmentProcessStatusList().subscribe(data => this.treatmentProcessStatusList = data);
  }

  openNewTreatmentProcessStatus() {
    this.treatmentProcessStatus = new TreatmentProcessStatus();
    this.submitted = false;
    this.treatmentProcessStatusDialog = true;
  }

  editTreatmentProcessStatus(treatmentProcessStatus: TreatmentProcessStatus) {
    this.treatmentProcessStatus = { ...treatmentProcessStatus };
    this.treatmentProcessStatusDialog = true;
  }

  deleteTreatmentProcessStatus(treatmentProcessStatus: TreatmentProcessStatus) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', treatmentProcessStatus.Name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.treatmentProcessStatusList = this.treatmentProcessStatusList.filter(val => val.Id !== treatmentProcessStatus.Id);
        this.treatmentProcessStatus = null;
        this.messageService.add({ severity: 'success', summary: this.l('::Message:Successful'), detail: this.l('::Message:SuccessfulDeletion', this.l('::Admin:TreatmentProcessStatus:Name')), life: 3000 });
      }
    });
  }

  hideDialog() {
    this.treatmentProcessStatusDialog = false;
    this.submitted = false;
  }

  saveTreatmentProcessStatus() {
    this.submitted = true;
  }
}
