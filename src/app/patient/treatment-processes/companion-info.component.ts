import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { ContractedInstitutionDto } from '@proxy';
import { ContractedInstitutionStaffDto } from '@proxy/dto/contracted-institution-staff';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientAdmissionMethodDto } from '@proxy/dto/patient-admission-method';
import { SalesMethodAndCompanionInfoDto } from '@proxy/dto/sales-method-and-companion-info';
import { ContractedInstitutionService, ContractedInstitutionStaffService, LanguageService, NationalityService, PatientAdmissionMethodService, SalesMethodAndCompanionInfoService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-companion-info',
  templateUrl: './companion-info.component.html',
  styleUrls: ['./companion-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanionInfoComponent extends AppComponentBase {

  @Input() treatmentProcessId: number;
  patientAdmissionMethodList: PatientAdmissionMethodDto[] = [];
  contractedInstitutionList: ContractedInstitutionDto[] = [];
  institutionStaffList: ContractedInstitutionStaffDto[] = [];
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
  loading: boolean;
  salesAndCompanionInfo: SalesMethodAndCompanionInfoDto;
  selectedStaffEmail: string;
  selectedStaffPhone: string;
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    injector: Injector,
    private nationalityService: NationalityService,
    private languageService: LanguageService,
    private contractedInstitutionService: ContractedInstitutionService,
    private contractedInstitutionStaffService: ContractedInstitutionStaffService,
    private admissionMethodService: PatientAdmissionMethodService,
    private salesAndCompanionInfoService: SalesMethodAndCompanionInfoService
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
      this.admissionMethodService.getList(),
      this.salesAndCompanionInfoService.getByPatientTreatmentProcessId(this.treatmentProcessId)
    ]).subscribe(
      {
        next: ([
          resNationalityList,
          resLanguageList,
          resContractedInstitutionList,
          resAdmissionMethodList,
          resSalesAndCompanionInfo
        ]) => {
          this.nationalityList = resNationalityList.items;
          this.languageList = resLanguageList.items;
          this.contractedInstitutionList = resContractedInstitutionList.items;
          this.patientAdmissionMethodList = resAdmissionMethodList.items;
          if (resSalesAndCompanionInfo) {
            this.salesAndCompanionInfo = resSalesAndCompanionInfo;
            if (this.salesAndCompanionInfo.contractedInstitutionId) {
              this.onInstitutionSelect();
            }
          }
          else {
            this.salesAndCompanionInfo = {} as SalesMethodAndCompanionInfoDto;
          }
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

  onInstitutionSelect() {
    if (this.salesAndCompanionInfo.contractedInstitutionId) {
      this.contractedInstitutionStaffService.getByInstitutionList(this.salesAndCompanionInfo.contractedInstitutionId).subscribe({
        next: (staffList) => {
          this.institutionStaffList = staffList.items;
          this.salesAndCompanionInfo.contractedInstitutionStaffId = this.institutionStaffList.find(s=>s.isActive && s.isDefault).id;
          if (this.salesAndCompanionInfo.contractedInstitutionStaffId) {
            this.onInstitutionStaffSelect();
          }
        }
      });
    }
  }

  onInstitutionStaffSelect() {
    if (this.salesAndCompanionInfo.contractedInstitutionStaffId) {
      let staff = this.institutionStaffList.find(s => s.id == this.salesAndCompanionInfo.contractedInstitutionStaffId);
      this.selectedStaffEmail = staff.email;
      this.selectedStaffPhone = this.nationalityList.find(n => n.id == staff.phoneCountryCodeId)?.phoneCode + " " + staff.phoneNumber;
    }
  }

  saveSalesAndCompanionInfo() {
    this.salesAndCompanionInfo.patientTreatmentProcessId = this.treatmentProcessId;
    this.salesAndCompanionInfoService.save(this.salesAndCompanionInfo).subscribe({
      complete: () => {
        this.success(this.l('::Message:SuccessfulSave', this.l('::SalesAndCompanionInfo:Name')));
        this.save.emit();
      }
    });
  }

}
