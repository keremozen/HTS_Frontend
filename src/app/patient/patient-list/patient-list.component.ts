import { ConfigStateService } from '@abp/ng.core';
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GenderDto } from '@proxy/dto/gender';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientDto } from '@proxy/dto/patient';
import { GenderService, LanguageService, NationalityService, PatientService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { PatientFilter } from 'src/app/models/patient/patientFilter.model';
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
  patientFilter = new PatientFilter();
  loading: boolean;
  totalRecords: number;

  constructor(
    injector: Injector,
    private genderService: GenderService,
    private nationalityService: NationalityService,
    private languageService: LanguageService,
    private patientService: PatientService
  ) {
    super(injector);
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
    this.patientFilter = new PatientFilter();
  }

  onFilter() {

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
