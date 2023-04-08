import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenderDto } from '@proxy/dto/gender';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { SavePatientDto } from '@proxy/dto/patient';
import { GenderService, LanguageService, NationalityService, PatientService } from '@proxy/service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewPatientComponent extends AppComponentBase {

  title: string;
  patient: SavePatientDto = {} as SavePatientDto;
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
  genderList: GenderDto[] = [];
  loading: boolean;
  maxBirthDate: Date = moment().toDate();

  constructor(
    injector: Injector,
    private nationalityService: NationalityService,
    private genderService: GenderService,
    private languageService: LanguageService,
    private patientService: PatientService
  ) {
    super(injector);
    console.log(this.maxBirthDate);
  }

  ngOnInit() {
    this.title = this.l("::PatientDetail:NewTitle")
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    forkJoin([
      this.genderService.getList(),
      this.nationalityService.getList(),
      this.languageService.getList()
    ]).subscribe(
      {
        next: ([
          resGenderList,
          resNationalityList,
          resLanguageList
        ]) => {
          this.genderList = resGenderList.items;
          this.nationalityList = resNationalityList.items;
          this.languageList = resLanguageList.items;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      }
    );
  }

  onSaveProfile() {
    this.loading = true;
    this.patientService.create(this.patient).subscribe({
      next: (res) => {
        this.success(this.l("::PatientDetail:SaveSuccessful"));
        if (res.id) {
          this.router.navigate(['/patient/edit/' + res.id]);
        }
        else {
          this.router.navigate(['/patient']);
        }
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });

  }
}
