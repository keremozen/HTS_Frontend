import { IdentityUserDto } from '@abp/ng.identity/proxy';
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenderDto } from '@proxy/dto/gender';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientDto, SavePatientDto } from '@proxy/dto/patient';
import { PatientService } from '@proxy/service';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent extends AppComponentBase {

  title: string;
  patientId: number;
  patient: SavePatientDto = {} as SavePatientDto;
  patientView: PatientDto;
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
  genderList: GenderDto[] = [];
  loading: boolean;
  maxBirthDate: Date = moment().toDate();
  minBirthDate: Date = moment('01.01.1900').toDate();
  creatorName: string;
  creationTime: Date;

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private patientService: PatientService,
    private route: ActivatedRoute,
  ) {
    super(injector);
  }

  ngOnInit() {
    
    if (this.route.snapshot.paramMap.get('id')) {
      this.patientId = +this.route.snapshot.paramMap.get('id');
      if (this.patient) {
        this.languageList = this.commonService.languageList;
        this.nationalityList = this.commonService.nationalityList;
        this.genderList = this.commonService.genderList;
        this.patientService.get(this.patientId).subscribe({
          next: (patient) => {
            this.patientView = {...patient};
            this.creatorName = (patient.creator as unknown as IdentityUserDto).name;
            this.creationTime = new Date(patient.creationTime);
            this.patient = patient as SavePatientDto;
          },
          complete: () => {
            if (this.patient) {
              this.patient.birthDate = new Date(this.patient.birthDate);
              this.title = this.l("::PatientDetail:EditTitle");
            }
          }
        });
      }
    }
  }

  onSaveProfile() {
    this.loading = true;
    this.patientService.update(this.patientId, this.patient).subscribe({
      complete: () => {
        this.success(this.l("::PatientDetail:SaveSuccessful"));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

  }
}
