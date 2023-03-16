import { ConfigStateService } from '@abp/ng.core';
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ILanguage } from 'src/app/models/language.model';
import { INationality } from 'src/app/models/nationality.model';
import { PatientFilter } from 'src/app/models/patient/patientFilter.model';
import { LanguageService } from 'src/app/services/language.service';
import { NationalityService } from 'src/app/services/nationality.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PatientListComponent extends AppComponentBase {

  patientList: any[] = [];
  patient: any;
  nationalityList: INationality[] = [];
  languageList: ILanguage[] = [];
  genderList: any[] = [{ Name: "Erkek" }, { Name: "Kadın" }];
  patientFilter = new PatientFilter();

  constructor(
    injector: Injector,
    private config: ConfigStateService,
    private nationalityService: NationalityService,
    private languageService: LanguageService,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit() {
    // this.config is instance of ConfigStateService

const currentUser = this.config.getOne("currentUser");

// or
this.config.getOne$("currentUser").subscribe(currentUser => {
   // use currentUser here
})

    this.fetchData();
  }
  fetchData() {
    forkJoin([
      this.nationalityService.getNationalityList(),
      this.languageService.getLanguageList()
    ]).subscribe(
      {
        next: ([
          resNationalityList,
          resLanguageList
        ]) => {
          this.nationalityList = resNationalityList;
          this.languageList = resLanguageList;
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
    this.router.navigate(['/patient/detail']);
  }


  editPatient(patient: any) {
      this.router.navigate(['/patient/detail/'+patient.Id]);
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
}
