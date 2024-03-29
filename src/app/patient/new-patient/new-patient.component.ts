import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { GenderDto } from '@proxy/dto/gender';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { SavePatientDto } from '@proxy/dto/patient';
import { PatientService } from '@proxy/service';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
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
  minBirthDate: Date = moment('01.01.1900').toDate();

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private patientService: PatientService
  ) {
    super(injector);
    console.log(this.maxBirthDate);
  }

  ngOnInit() {
    this.title = this.l("::PatientDetail:NewTitle")
    this.languageList = this.commonService.languageList;
    this.nationalityList = this.commonService.nationalityList;
    this.genderList = this.commonService.genderList;
  }

  onSaveProfile() {
    this.loading = true;
    if (this.patient.email === "") {
      this.patient.email = null;
    }
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
