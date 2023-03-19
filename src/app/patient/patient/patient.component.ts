import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ILanguage } from 'src/app/models/language.model';
import { INationality } from 'src/app/models/nationality.model';
import { CRUDPatient } from 'src/app/models/patient/crudPatient.model';
import { LanguageService } from 'src/app/services/language.service';
import { NationalityService } from 'src/app/services/nationality.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent extends AppComponentBase {

  title: string;
  editMode: boolean = false;
  patient: CRUDPatient = new CRUDPatient();
  nationalityList: INationality[] = [];
  languageList: ILanguage[] = [];
  genderList: any[] = [{ Name: "Erkek" }, { Name: "Kadın" }];

  constructor(
    injector: Injector,
    private nationalityService: NationalityService,
    private languageService: LanguageService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.title = this.editMode ? this.l("::PatientDetail:EditTitle") : this.l("::PatientDetail:NewTitle")
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

  onSaveProfile() {
    //TODO: Kerem - Save etme işlemleri
    this.success(this.l("::PatientDetail:SaveSuccessful"));
    this.editMode = true;
  }
}
