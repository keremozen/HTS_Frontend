import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { TaskType } from '@proxy/dto';
import { GenderDto } from '@proxy/dto/gender';
import { HTSTaskDto } from '@proxy/dto/htstask';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { FilterPatientDto, PatientDto } from '@proxy/dto/patient';
import { PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';
import { TreatmentProcessStatusDto } from '@proxy/dto/treatment-process-status';
import { EntityEnum_PatientTreatmentStatusEnum, EntityEnum_TaskTypeEnum, entityEnum_TaskTypeEnumOptions } from '@proxy/enum';
import { HTSTaskService, PatientService, TreatmentProcessStatusService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PatientListComponent extends AppComponentBase {

  patientList: PatientDto[] = [];
  patient: PatientDto;
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
  genderList: GenderDto[] = [];
  taskList: HTSTaskDto[] = [];
  processStatusList: TreatmentProcessStatusDto[] = [];
  patientFilter: FilterPatientDto = {} as FilterPatientDto;
  loading: boolean;
  totalRecords: number;
  isAllowedToManage: boolean = false;
  creatorNames: string;
  viewOptions: any[] = [{ label: 'Liste Görünümü', value: 'list' }, { label: 'Pano Görünümü', value: 'pane' }];
  selectedView: string = 'list';
  patientStatusList: any[] = [
    { label: 'Yeni', value: '1' },
    { label: 'Tedavi Planı Hazırlanmayacak', value: '2' },
    { label: 'Dokümanların Çevrilmesi Bekleniyor', value: '3' },
    { label: 'Hastanelerden Cevap Bekleniyor', value: '4' },
    { label: 'Ek Bilgi Bekleniyor', value: '5' },
    { label: 'Hastane Cevabının Değerlendirilmesi Bekleniyor', value: '6' },
    { label: 'Fiyatlandırmaya Gönderilmesi Bekleniyor', value: '7' },
    { label: 'Fiyatlandırma Bekleniyor', value: '8' },
    { label: 'MFB Onayı Bekleniyor', value: '9' },
    { label: 'Proformanın İletilmesi Bekleniyor', value: '10' },
    { label: 'Proformanın Cevaplanması Bekleniyor', value: '11' },
    { label: 'Ön Ödemenin Alınması Bekleniyor', value: '12' },
    { label: 'Davet Mektubu Gönderilmesi Bekleniyor', value: '13' },
    { label: 'Seyahat ve Konaklama Planı Girilmesi Bekleniyor', value: '14' },
    { label: 'Randevu Planlama', value: '15' },
    { label: 'Tedavi Aşaması', value: '16' },
    { label: 'Sonuçlanan Süreç', value: '17' },
  ];

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private patientService: PatientService,
    private treatmentProcessStatusService: TreatmentProcessStatusService,
    private taskService: HTSTaskService
  ) {
    super(injector);
    this.isAllowedToManage = this.permission.getGrantedPolicy("HTS.PatientManagement")
  }

  ngOnInit() {
    var storedView = localStorage.getItem("patientView");
    if (storedView) {
      this.selectedView = storedView;
    }
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.nationalityList = this.commonService.nationalityList;
    this.languageList = this.commonService.languageList;
    this.genderList = this.commonService.genderList;

    forkJoin([
      this.treatmentProcessStatusService.getList(),
      this.patientService.getList(),
      this.taskService.getList()
    ]).subscribe({
      next: ([
        resStatusList,
        resPatientList,
        resTaskList
      ]) => {
        this.processStatusList = resStatusList.items;
        this.patientList = resPatientList.items;
        this.totalRecords = resPatientList.totalCount;
        this.taskList = resTaskList.items;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onClearFilters() {
    this.patientFilter = {} as FilterPatientDto;
    this.patientService.getList().subscribe({
      next: (res) => {
        this.patientList = res.items;
        this.totalRecords = res.totalCount;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onFilter() {
    this.loading = true;
    this.patientService.filterList(this.patientFilter).subscribe({
      next: (res) => {
        this.patientList = res.items;
        this.totalRecords = res.totalCount;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onViewChanged() {
    if (this.selectedView) {
      localStorage.setItem("patientView", this.selectedView);
    }
  }

  openNewPatient() {
    this.router.navigate(['/patient/new']);
  }

  editPatientByRowClick(event: any, id: number) {
    if (event.srcElement.nodeName.toLowerCase() != 'button') {
      this.router.navigate(['/patient/edit/' + id]);
    }
  }

  editPatientOnNewTab(id: number) {
    this.router.navigate([]).then(result => { window.open('/patient/edit/' + id, '_blank'); });
  }

  editPatient(id: number) {
    this.router.navigate(['/patient/edit/' + id]);
  }

  deletePatient(patient: PatientDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', patient.name + " " + patient.surname),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientService.delete(+patient.id).subscribe({
          complete: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::PatientDetail:Name')));
            this.fetchData();
          }
        });
      }
    });
  }

  public getTreatmentProcessStatus(patient: PatientDto) {
    if (patient) {
      if (patient.noTreatmentPlan) {
        return this.l('::PatientDetail:NoTreatmentPlan');
      }
      else {
        return patient.patientTreatmentProcesses[0] ? (patient.patientTreatmentProcesses[0]?.treatmentCode +
          " (" + patient.patientTreatmentProcesses[0]?.treatmentProcessStatus?.name + ")") : "-";
      }
    }
    return "-";
  }

  getPatientList(patientStatus: string) {
    switch (patientStatus) {
      case "1": //Yeni
        return this.patientList.filter(p => p.patientTreatmentProcesses.length == 0 && !p.noTreatmentPlan);
      case "2": //Tedavi planı hazırlanmayacak
        return this.patientList.filter(p => p.patientTreatmentProcesses.length == 0 && p.noTreatmentPlan);
      case "3": //Dokümanların çevirilmesi bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.DocumentTranslate).some(t => t.patientId == +p.id));
      case "4": //Hastanelerden cevap bekleniyor
        return this.patientList.filter(p => p.patientTreatmentProcesses.some(ptp => ptp.isFinalized == false && ptp.treatmentProcessStatusId == EntityEnum_PatientTreatmentStatusEnum.HospitalAskedWaitingResponse));
      case "5": //Ek bilgi bekleniyor
        return null;
        //return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.EvaluationOfHospitalResponse).some(t => t.patientId == +p.id));
      case "6": //Hastane cevabının değerlendirilmesi bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.EvaluationOfHospitalResponse).some(t => t.patientId == +p.id));
      case "7": //Fiyatlandırma gönderilmesi bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.WaitingSentPricing).some(t => t.patientId == +p.id));
      case "8": //Fiyatlandırma bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.Pricing).some(t => t.patientId == +p.id));
      case "9": //MFB Onayı bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.MFBApproval).some(t => t.patientId == +p.id));
      case "10": //Proformanın iletilmesi bekleniyor
        return null;
      case "11": //Proformanın cevaplanması bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.AnsweringProforma).some(t => t.patientId == +p.id));
      case "12": //Ön ödemenin alınması bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.RequestingDownPayment).some(t => t.patientId == +p.id));
      case "13": //Davet mektubu gönderilmesi bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.SendingInvitationLetter).some(t => t.patientId == +p.id));
      case "14": //Sehayat ve konaklama planı girilmesi bekleniyor
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.EnteringTravelAccommodationPlan).some(t => t.patientId == +p.id));
      case "15": //Randevu planlama
        return this.patientList.filter(p => this.taskList.filter(t => t.taskTypeId == EntityEnum_TaskTypeEnum.AppointmentScheduling).some(t => t.patientId == +p.id));
      case "16": //Tedavi aşaması
        return this.patientList.filter(p => p.patientTreatmentProcesses.some(ptp => ptp.isFinalized == false && ptp.treatmentProcessStatusId == EntityEnum_PatientTreatmentStatusEnum.PaymentCompletedTreatmentProcess));
      case "17": //Sonuçlanan süreç
        return this.patientList.filter(p => p.patientTreatmentProcesses.some(ptp => ptp.isFinalized == true));
    }
  }
}
