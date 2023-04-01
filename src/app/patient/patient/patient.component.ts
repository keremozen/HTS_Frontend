import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenderDto } from '@proxy/dto/gender';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { SavePatientDto } from '@proxy/dto/patient';
import { GenderService, LanguageService, NationalityService, PatientService } from '@proxy/service';
import { forkJoin } from 'rxjs';
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
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
  genderList: GenderDto[] = [];
  loading: boolean;

  constructor(
    injector: Injector,
    private nationalityService: NationalityService,
    private genderService: GenderService,
    private languageService: LanguageService,
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit() {
    
    if (this.route.snapshot.paramMap.get('id')) {
      this.patientId = +this.route.snapshot.paramMap.get('id');
      if (this.patient) {
        this.patientService.get(this.patientId).subscribe({
          next: (patient) => {
            this.patient = patient as SavePatientDto;
          },
          complete: () => {
            if (this.patient) {
              this.patient.birthDate = new Date(this.patient.birthDate);
              this.title = this.l("::PatientDetail:EditTitle");
              this.fetchData();
            }
          }
        });
      }
    }
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
