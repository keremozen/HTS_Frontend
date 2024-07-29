import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { GenderDto } from '@proxy/dto/gender';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { FilterPatientDto, PatientDto } from '@proxy/dto/patient';
import { PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';
import { TreatmentProcessStatusDto } from '@proxy/dto/treatment-process-status';
import { PatientService, TreatmentProcessStatusService } from '@proxy/service';
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
    private treatmentProcessStatusService: TreatmentProcessStatusService
  ) {
    super(injector);
    this.isAllowedToManage = this.permission.getGrantedPolicy("HTS.PatientManagement")
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.nationalityList = this.commonService.nationalityList;
    this.languageList = this.commonService.languageList;
    this.genderList = this.commonService.genderList;

    forkJoin([
      this.treatmentProcessStatusService.getList(),
      this.patientService.getList()
    ]).subscribe({
      next: ([
        resStatusList,
        resPatientList
      ]) => {
        this.processStatusList = resStatusList.items;
        this.patientList = resPatientList.items;
        this.totalRecords = resPatientList.totalCount;
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
        return null;
      case "4": //Hastanelerden cevap bekleniyor
        return null;
      case "5": //Ek bilgi bekleniyor
        return null;
      case "6": //Hastane cevabının değerlendirilmesi bekleniyor
        return null;
      case "7": //Fiyatlandırma gönderilmesi bekleniyor
        return null;
      case "8": //Fiyatlandırma bekleniyor
        return null;
      case "9": //MFB Onayı bekleniyor
        return null;
      case "10": //Proformanın iletilmesi bekleniyor
        return null;
      case "11": //Proformanın cevaplanması bekleniyor
        return null;
      case "12": //Ön ödemenin alınması bekleniyor
        return null;
      case "13": //Davet mektubu gönderilmesi bekleniyor
        return null;
      case "14": //Sehayat ve konaklama planı girilmesi bekleniyor
        return null;
      case "15": //Randevu planlama
        return null;
      case "16": //Tedavi aşaması
        return null;
      case "17": //Sonuçlanan süreç
        return null;

    }
  }
}
