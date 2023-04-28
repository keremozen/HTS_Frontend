import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { GenderDto } from '@proxy/dto/gender';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { FilterPatientDto, PatientDto } from '@proxy/dto/patient';
import { PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';
import { GenderService, LanguageService, NationalityService, PatientService, PatientTreatmentProcessService } from '@proxy/service';
import { forkJoin } from 'rxjs';
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
  processList: PatientTreatmentProcessDto[] = [];
  patientFilter: FilterPatientDto = {} as FilterPatientDto;
  loading: boolean;
  totalRecords: number;
  isAllowedToManage: boolean = false;
  creatorNames: string;

  constructor(
    injector: Injector,
    private genderService: GenderService,
    private nationalityService: NationalityService,
    private languageService: LanguageService,
    private patientService: PatientService
  ) {
    super(injector);
    this.isAllowedToManage = this.permission.getGrantedPolicy("HTS.PatientManagement")
  }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.loading = true;
    forkJoin([
      this.genderService.getList(),
      this.nationalityService.getList(),
      this.languageService.getList(),
      this.patientService.getList()
    ]).subscribe(
      {
        next: ([
          resGenderList,
          resNationalityList,
          resLanguageList,
          resPatientList
        ]) => {
          this.genderList = resGenderList.items;
          this.nationalityList = resNationalityList.items;
          this.languageList = resLanguageList.items;
          this.patientList = resPatientList.items;
          this.totalRecords = resPatientList.totalCount;
        },
        error: ()=> {
          this.loading = false;
        },
        complete: ()=> {
          this.loading = false;
        }
      }
    );
  }

  onClearFilters() {
    this.patientFilter = {} as FilterPatientDto;
    this.patientService.getList().subscribe({
      next: (res) => {
        this.patientList = res.items;
        this.totalRecords = res.totalCount;
      },
      error: ()=> {
        this.loading = false;
      },
      complete: ()=> {
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
      error: ()=> {
        this.loading = false;
      },
      complete: ()=> {
        this.loading = false;
      }
    });
  }

  openNewPatient() {
    this.router.navigate(['/patient/new']);
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
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Patient:Name')));
            this.fetchData();
          }
        });
      }
    });
  }
}
