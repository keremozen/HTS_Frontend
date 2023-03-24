import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { LanguageService, NationalityService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { CRUDPatient } from 'src/app/models/patient/crudPatient.model';
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
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
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

  onSaveProfile() {
    //TODO: Kerem - Save etme işlemleri
    this.success(this.l("::PatientDetail:SaveSuccessful"));
    this.editMode = true;
  }
}
