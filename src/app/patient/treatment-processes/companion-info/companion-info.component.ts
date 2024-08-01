import { Component, EventEmitter, Injector, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContractedInstitutionDto } from '@proxy';
import { ContractedInstitutionStaffDto } from '@proxy/dto/contracted-institution-staff';
import { SaveDocumentDto } from '@proxy/dto/invitation-letter-document';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientAdmissionMethodDto } from '@proxy/dto/patient-admission-method';
import { SalesMethodAndCompanionInfoDto } from '@proxy/dto/sales-method-and-companion-info';
import { ContractedInstitutionService, ContractedInstitutionStaffService, InvitationLetterDocumentService, LanguageService, NationalityService, PatientAdmissionMethodService, SalesMethodAndCompanionInfoService } from '@proxy/service';
import { FileUpload } from 'primeng/fileupload';
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
  displayUploadInvitationLetter: boolean = false;
  uploadedInvitationLetters: any[] = [];
  invitationLetterDocument: SaveDocumentDto;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @ViewChild("invitationLetter", { static: false }) documentUpload: FileUpload;

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private contractedInstitutionStaffService: ContractedInstitutionStaffService,
    private salesAndCompanionInfoService: SalesMethodAndCompanionInfoService,
    private invitationLetterService: InvitationLetterDocumentService
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

  download(salesInfoAndCompanionInfo: SalesMethodAndCompanionInfoDto) {
    this.invitationLetterService.createInvitationLetterBySalesMethodId(salesInfoAndCompanionInfo.id).subscribe({
      next: r => {
        const source = `data:application/pdf;base64,${r}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = "invitationletter.pdf"    
        link.click();
      }
    });
  }

  upload(salesInfoAndCompanionInfoId: number) {
    this.invitationLetterService.getBySalesInfo(salesInfoAndCompanionInfoId).subscribe(r => {
      if (r != null) {
        this.invitationLetterDocument = r as SaveDocumentDto;
        this.uploadedInvitationLetters.push(this.dataURLtoFile(r.file, r.fileName, r.contentType));
        this.displayUploadInvitationLetter = true;
      }
      else {
        this.invitationLetterDocument = {} as SaveDocumentDto;
        this.invitationLetterDocument.salesMethodAndCompanionInfoId = salesInfoAndCompanionInfoId;
        this.displayUploadInvitationLetter = true;
      }
    });
  }

  sendInvitationLetter(salesInfoAndCompanionInfoId: number) {
    this.invitationLetterService.sendEMailToPatientBySalesMethodId(salesInfoAndCompanionInfoId).subscribe({
      complete: () => {
        this.success(this.l('::Message:SuccessfulSendInvitationLetter'));
      }
    });
  }

  dataURLtoFile(base64, filename, type) {
    var mime = type,
      bstr = atob(base64),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  uploadInvitationLetter() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.uploadedInvitationLetters[0]);
    fileReader.onload = (r) => {
      if (this.invitationLetterDocument) {
        this.invitationLetterDocument.fileName = this.uploadedInvitationLetters[0].name;
        this.invitationLetterDocument.file = fileReader.result as string;
        this.invitationLetterDocument.contentType = this.uploadedInvitationLetters[0].type;
        this.invitationLetterService.upload(this.invitationLetterDocument).subscribe({
          next: (res) => {
            this.success(this.l('::Message:SuccessfulSave', this.l('::SalesAndCompanionInfo:InvitationLetters:NameSingular')));
            this.fetchData();
            this.hideUploadInvitationLetterDialog();
          }
        });
      }
    };
  }

  onSelect(event: any) {
    this.uploadedInvitationLetters = [];
    for (let file of event.files) {
      this.uploadedInvitationLetters.push(file);
    }
  }

  openFile(file: any) {
    const url = window.URL.createObjectURL(file);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  }

  removeFile() {
    this.uploadedInvitationLetters = [];
    this.documentUpload.clear();
  }

  hideUploadInvitationLetterDialog() {
    this.invitationLetterDocument = null;
    this.uploadedInvitationLetters = [];
    this.displayUploadInvitationLetter = false;
  }

}
