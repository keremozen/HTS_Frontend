import { ConfigStateService } from '@abp/ng.core';
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { LanguageService, NationalityService } from '@proxy/service';
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

  patientList: any[] = [];
  patient: any;
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
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
      this.nationalityService.getList(),
      this.languageService.getList()
    ]).subscribe(
      {
        next: ([
          resNationalityList,
          resLanguageList
        ]) => {
          this.nationalityList = resNationalityList.items;
          this.languageList = resLanguageList.items;
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
    this.router.navigate(['/patient/detail/' + patient.Id]);
  }

  deletePatient(patient: any) {
    /*this.confirm({
        message: this.l('::Message:DeleteConfirmation', hospital.Name),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.hospitalList = this.hospitalList.filter(val => val.Id !== hospital.Id);
            this.hospital = null;
            
        }
    });*/
  }
}
