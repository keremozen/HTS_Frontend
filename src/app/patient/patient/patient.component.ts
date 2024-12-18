import { ConfigStateService, CurrentUserDto } from '@abp/ng.core';
import { IdentityUserDto } from '@abp/ng.identity/proxy';
import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenderDto } from '@proxy/dto/gender';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientDto, SavePatientDto } from '@proxy/dto/patient';
import { HTSTaskService, PatientDocumentService, PatientService } from '@proxy/service';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { DocumentsComponent } from '../documents/documents.component';

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
  isAllowedToManage: boolean = false;
  isAssignedToTik?: boolean = null;
  currentUser: CurrentUserDto;
  noTreatmentPlan: boolean = false;
  @ViewChild("documentComponent", { static: false }) documentComponent: DocumentsComponent;

  constructor(
    injector: Injector,
    private config: ConfigStateService,
    private commonService: CommonService,
    private patientService: PatientService,
    private htsTaskService: HTSTaskService,
    private route: ActivatedRoute,
    private patientDocumentService: PatientDocumentService
  ) {
    super(injector);
    this.isAllowedToManage = this.permission.getGrantedPolicy("HTS.PatientManagement")
  }

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.currentUser = this.config.getOne("currentUser");
    if (this.route.snapshot.paramMap.get('id')) {
      this.patientId = +this.route.snapshot.paramMap.get('id');
      if (this.patient) {
        this.languageList = this.commonService.languageList;
        this.nationalityList = this.commonService.nationalityList;
        this.genderList = this.commonService.genderList;
        this.patientService.get(this.patientId).subscribe({
          next: (patient) => {
            this.isAssignedToTik = patient.isAssignedToTik;
            this.patientView = { ...patient };
            this.noTreatmentPlan = patient.noTreatmentPlan;
            this.creatorName = (patient.creator as unknown as IdentityUserDto).name + " " + (patient.creator as unknown as IdentityUserDto).surname;
            this.creationTime = new Date(patient.creationTime);
            this.patient = patient as SavePatientDto;
            if (this.patient.birthDate != null) {
              this.patient.birthDate = new Date(this.patient.birthDate);
            }
          },
          complete: () => {
            if (this.patient) {
              this.title = this.l("::PatientDetail:EditTitle");
            }
          }
        });
      }
    }
  }

  onSaveProfile() {
    this.loading = true;
    if (this.patient.email === "") {
      this.patient.email = null;
    }
    this.patient.noTreatmentPlan = this.noTreatmentPlan;
    console.log(JSON.stringify(this.patient));
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

  onSendToTIK() {
    this.htsTaskService.assignToTikByUserId(this.patientId).subscribe({
      complete: () => {
        this.success(this.l("::PatientDetail:SentToTikSuccessful"));
        this.fetchData();
      }
    });
  }

  onReturnFromTIK() {
    this.htsTaskService.returnFromTikByUserId(this.patientId).subscribe({
      complete: () => {
        this.success(this.l("::PatientDetail:ReturnSuccessful"));
        this.fetchData();
      }
    });
  }

  onDocumentUploaded() {
    this.patientDocumentService.getList(this.patientId).subscribe({
      next: res=> {
        this.documentComponent.refresh();
      }
    })
  }
}
