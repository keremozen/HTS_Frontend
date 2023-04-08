import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { ContractedInstitutionDto } from '@proxy';
import { ContractedInstitutionStaffDto } from '@proxy/dto/contracted-institution-staff';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientAdmissionMethodDto } from '@proxy/dto/patient-admission-method';
import { ContractedInstitutionService, ContractedInstitutionStaffService, LanguageService, NationalityService, PatientAdmissionMethodService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-companion-info',
  templateUrl: './companion-info.component.html',
  styleUrls: ['./companion-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanionInfoComponent extends AppComponentBase {

  patientAdmissionMethodList: PatientAdmissionMethodDto[] = [];
  contractedInstitutionList: ContractedInstitutionDto[] = [];
  institutionStaffList: ContractedInstitutionStaffDto[] = [];
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
  attendantInfo: any;
  loading: boolean;
  salesAndCompanionInfo: any = {};
  selectedStaffEmail: string;
  selectedStaffPhone: string;

  constructor(
    injector: Injector,
    private nationalityService: NationalityService,
    private languageService: LanguageService,
    private contractedInstitutionService: ContractedInstitutionService,
    private contractedInstitutionStaffService: ContractedInstitutionStaffService,
    private admissionMethodService: PatientAdmissionMethodService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    forkJoin([
      this.nationalityService.getList(),
      this.languageService.getList(),
      this.contractedInstitutionService.getList(),
      this.admissionMethodService.getList()
    ]).subscribe(
      {
        next: ([
          resNationalityList,
          resLanguageList,
          resContractedInstitutionList,
          resAdmissionMethodList
        ]) => {
          this.nationalityList = resNationalityList.items;
          this.languageList = resLanguageList.items;
          this.contractedInstitutionList = resContractedInstitutionList.items;
          this.patientAdmissionMethodList = resAdmissionMethodList.items;
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

  onInstitutionSelect(){
    if (this.salesAndCompanionInfo.contractedInstitutionId) {
      this.contractedInstitutionStaffService.getByInstitutionList(this.salesAndCompanionInfo.contractedInstitutionId).subscribe({
        next: (staffList) => {
          this.institutionStaffList = staffList.items;
        }
      });
    }
  }

  onInstitutionStaffSelect() {
    if (this.salesAndCompanionInfo.contractedInstitutionStaffId) {
      let staff = this.institutionStaffList.find(s=>s.id == this.salesAndCompanionInfo.contractedInstitutionStaffId);
      this.selectedStaffEmail = staff.email;
      this.selectedStaffPhone = this.nationalityList.find(n=>n.id == staff.phoneCountryCodeId)?.phoneCode +" "+ staff.phoneNumber;
    }
  }

  
}
