import { Component, Injector } from '@angular/core';
import { PatientAdmissionMethodDto, SavePatientAdmissionMethodDto } from '@proxy/dto/patient-admission-method';
import { PatientAdmissionMethodService } from '@proxy/service';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient-admission-method',
  templateUrl: './patient-admission-method.component.html',
  styleUrls: ['./patient-admission-method.component.scss']
})
export class PatientAdmissionMethodComponent extends AppComponentBase {
  patientAdmissionMethodDialog: boolean;
  patientAdmissionMethodList: PatientAdmissionMethodDto[];
  patientAdmissionMethod: SavePatientAdmissionMethodDto;
  isEdit: boolean;
  patientAdmissionMethodToBeEdited: PatientAdmissionMethodDto;
  loading: boolean;
  totalRecords: number = 0;

  constructor(
    injector: Injector,
    private patientAdmissionMethodService: PatientAdmissionMethodService,
    private commonService: CommonService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.patientAdmissionMethodService.getList().subscribe({
      next: data => {
        this.patientAdmissionMethodList = data.items;
        this.totalRecords = data.totalCount;
        this.commonService.patientAdmissionMethodList = this.patientAdmissionMethodList.filter(p=>p.isActive == true);
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openNewPatientAdmissionMethod() {
    this.isEdit = false;
    this.patientAdmissionMethod = {} as SavePatientAdmissionMethodDto;
    this.patientAdmissionMethod.isActive = true;
    this.patientAdmissionMethodDialog = true;
  }

  editPatientAdmissionMethod(patientAdmissionMethod: PatientAdmissionMethodDto) {
    this.isEdit = true;
    this.patientAdmissionMethodToBeEdited = patientAdmissionMethod;
    this.patientAdmissionMethod = { ...patientAdmissionMethod as SavePatientAdmissionMethodDto };
    this.patientAdmissionMethodDialog = true;
  }

  deletePatientAdmissionMethod(patientAdmissionMethod: PatientAdmissionMethodDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', patientAdmissionMethod.name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientAdmissionMethodService.delete(patientAdmissionMethod.id).subscribe({
          complete: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:PatientAdmissionMethod:Name')));
            this.fetchData();
            this.hideDialog();
          }
        });
      }
    });
  }

  savePatientAdmissionMethod() {
    if (!this.isEdit) {
      this.patientAdmissionMethodService.create(this.patientAdmissionMethod).subscribe({
        complete: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:PatientAdmissionMethod:Name')));
        }
      });
    }
    else {
      this.patientAdmissionMethodService.update(+this.patientAdmissionMethodToBeEdited.id, this.patientAdmissionMethod).subscribe({
        complete: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:PatientAdmissionMethod:Name')));
        }
      });
    }
  }

  hideDialog() {
    this.patientAdmissionMethod = null;
    this.patientAdmissionMethodToBeEdited = null;
    this.patientAdmissionMethodDialog = false;
  }
}
