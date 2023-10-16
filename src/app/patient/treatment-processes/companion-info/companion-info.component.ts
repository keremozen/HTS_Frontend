import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { ContractedInstitutionDto } from '@proxy';
import { ContractedInstitutionStaffDto } from '@proxy/dto/contracted-institution-staff';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientAdmissionMethodDto } from '@proxy/dto/patient-admission-method';
import { SalesMethodAndCompanionInfoDto } from '@proxy/dto/sales-method-and-companion-info';
import { ContractedInstitutionService, ContractedInstitutionStaffService, LanguageService, NationalityService, PatientAdmissionMethodService, SalesMethodAndCompanionInfoService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-companion-info',
  templateUrl: './companion-info.component.html',
  styleUrls: ['./companion-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanionInfoComponent extends AppComponentBase {

  @Input() patientTreatmentProcessId: number;
  @Input() salesInfoAndCompanionInfo: SalesMethodAndCompanionInfoDto;
  patientAdmissionMethodList: PatientAdmissionMethodDto[] = [];
  contractedInstitutionList: ContractedInstitutionDto[] = [];
  institutionStaffList: ContractedInstitutionStaffDto[] = [];
  nationalityList: NationalityDto[] = [];
  languageList: LanguageDto[] = [];
  loading: boolean;
  selectedStaffEmail: string;
  selectedStaffPhone: string;
  isAllowedToManage: boolean = false;
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private contractedInstitutionStaffService: ContractedInstitutionStaffService,
    private salesAndCompanionInfoService: SalesMethodAndCompanionInfoService
  ) {
    super(injector);
    this.isAllowedToManage = this.permission.getGrantedPolicy("HTS.PatientManagement");
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    
    this.nationalityList = this.commonService.nationalityList;
    this.languageList = this.commonService.languageList;
    this.patientAdmissionMethodList = this.commonService.patientAdmissionMethodList;
    this.contractedInstitutionList = this.commonService.contractedInstitutionList;
    
    if (this.salesInfoAndCompanionInfo) {
      if (this.salesInfoAndCompanionInfo.contractedInstitutionId) {
        this.onInstitutionSelect();
      }
    }
    else {
      this.salesInfoAndCompanionInfo = {} as SalesMethodAndCompanionInfoDto;
    }
  }

  onInstitutionSelect() {
    if (this.salesInfoAndCompanionInfo.contractedInstitutionId) {
      this.contractedInstitutionStaffService.getByInstitutionList(this.salesInfoAndCompanionInfo.contractedInstitutionId).subscribe({
        next: (staffList) => {
          this.institutionStaffList = staffList.items;
          this.salesInfoAndCompanionInfo.contractedInstitutionStaffId = this.institutionStaffList.find(s=>s.isActive && s.isDefault)?.id;
          if (this.salesInfoAndCompanionInfo.contractedInstitutionStaffId) {
            this.onInstitutionStaffSelect();
          }
        }
      });
    }
  }

  onInstitutionStaffSelect() {
    if (this.salesInfoAndCompanionInfo.contractedInstitutionStaffId) {
      let staff = this.institutionStaffList.find(s => s.id == this.salesInfoAndCompanionInfo.contractedInstitutionStaffId);
      this.selectedStaffEmail = staff.email;
      const phoneCodeNationality = this.nationalityList.find(n => n.id == staff.phoneCountryCodeId);
      this.selectedStaffPhone = (phoneCodeNationality?.phoneCode ? phoneCodeNationality?.phoneCode + ' ' : '') + (staff.phoneNumber ? staff.phoneNumber : '');
    }
  }

  saveSalesAndCompanionInfo() {
    this.salesInfoAndCompanionInfo.patientTreatmentProcessId = this.patientTreatmentProcessId;
    this.salesAndCompanionInfoService.save(this.salesInfoAndCompanionInfo).subscribe({
      complete: () => {
        this.success(this.l('::Message:SuccessfulSave', this.l('::SalesAndCompanionInfo:Name')));
        this.save.emit();
      }
    });
  }

}
