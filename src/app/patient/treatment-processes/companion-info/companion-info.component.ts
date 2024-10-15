import { SaveHTSTaskDto } from './../../../proxy/dto/htstask/models';
import { IdentityUserDto } from '@abp/ng.identity/proxy';
import { Component, EventEmitter, Injector, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContractedInstitutionDto } from '@proxy';
import { Branch } from '@proxy/dto';
import { BranchDto } from '@proxy/dto/branch';
import { ContractedInstitutionStaffDto } from '@proxy/dto/contracted-institution-staff';
import { DocumentTypeDto } from '@proxy/dto/document-type';
import { LanguageDto } from '@proxy/dto/language';
import { NationalityDto } from '@proxy/dto/nationality';
import { PatientAdmissionMethodDto } from '@proxy/dto/patient-admission-method';
import { SavePatientDocumentDto } from '@proxy/dto/patient-document';
import { SalesMethodAndCompanionInfoDto } from '@proxy/dto/sales-method-and-companion-info';
import { SaveSMCIInterpreterAppointmentDto, SMCIInterpreterAppointmentDto } from '@proxy/dto/smciinterpreter-appointment';
import { EntityEnum_TaskTypeEnum } from '@proxy/enum';
import { ContractedInstitutionStaffService, HTSTaskService, InvitationLetterDocumentService, PatientDocumentService, SalesMethodAndCompanionInfoService, UserService } from '@proxy/service';
import { FileUpload } from 'primeng/fileupload';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-companion-info',
  templateUrl: './companion-info.component.html',
  styleUrls: ['./companion-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanionInfoComponent extends AppComponentBase {
  @Input() patientId: number;
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
  selectedDocumentTypeId: number;
  documentDescription: string;
  displayUploadDialog: boolean = false;
  uploadedDocuments: any[] = [];
  uploadingDocumentType: string;
  documentTypeList: DocumentTypeDto[] = [];
  documents: SavePatientDocumentDto[] = [];
  interpreterList: IdentityUserDto[] = [];
  selectedInterpreter: IdentityUserDto;
  displayAppointmentDialog: boolean = false;
  appointment: SMCIInterpreterAppointmentDto;
  branchList: BranchDto[] = [];

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() documentUploaded: EventEmitter<any> = new EventEmitter();
  @ViewChild("documentUpload", { static: false }) documentUpload: FileUpload;

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private contractedInstitutionStaffService: ContractedInstitutionStaffService,
    private salesAndCompanionInfoService: SalesMethodAndCompanionInfoService,
    private invitationLetterService: InvitationLetterDocumentService,
    private documentService: PatientDocumentService,
    private userService: UserService,
    private taskService: HTSTaskService
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
    this.documentTypeList = this.commonService.documentTypeList;
    this.branchList = this.commonService.branchList;

    this.userService.getInterpreterList().subscribe({
      next: res => {
        this.interpreterList = res;
        if (this.salesInfoAndCompanionInfo) {
          if (this.salesInfoAndCompanionInfo.contractedInstitutionId) {
            this.onInstitutionSelect();
          }
          if (this.salesInfoAndCompanionInfo.travelDateToTurkey) {
            this.salesInfoAndCompanionInfo.travelDateToTurkey = new Date(this.salesInfoAndCompanionInfo.travelDateToTurkey);
          }
          if (this.salesInfoAndCompanionInfo.treatmentDate) {
            this.salesInfoAndCompanionInfo.treatmentDate = new Date(this.salesInfoAndCompanionInfo.treatmentDate);
          }
          if (this.salesInfoAndCompanionInfo.appointedInterpreterId) {
            this.selectedInterpreter = this.interpreterList.find(i => i.id == this.salesInfoAndCompanionInfo.appointedInterpreterId);
          }
        }
        else {
          this.salesInfoAndCompanionInfo = {} as SalesMethodAndCompanionInfoDto;
        }
      }
    });

  }

  onInstitutionSelect() {
    if (this.salesInfoAndCompanionInfo.contractedInstitutionId) {
      this.contractedInstitutionStaffService.getByInstitutionList(this.salesInfoAndCompanionInfo.contractedInstitutionId).subscribe({
        next: (staffList) => {
          this.institutionStaffList = staffList.items;
          this.salesInfoAndCompanionInfo.contractedInstitutionStaffId = this.institutionStaffList.find(s => s.isActive && s.isDefault)?.id;
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
    if (this.selectedInterpreter) {
      this.salesInfoAndCompanionInfo.appointedInterpreterId = this.selectedInterpreter.id;
    }
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

  upload(type: string) {
    this.documents = [];
    this.uploadingDocumentType = type;
    this.displayUploadDialog = true;
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

  uploadDocument() {
    this.documents.forEach(document => {
      document.patientId = this.patientId;
      document.documentTypeId = this.selectedDocumentTypeId;
      document.description = this.documentDescription;
    });
    this.documentService.create(this.documents).subscribe({
      next: (res) => {
        var taskToBeClosed: SaveHTSTaskDto = {
          patientId: this.patientId,
          taskType: EntityEnum_TaskTypeEnum.DocumentTranslate,
          relatedEntityId: this.patientTreatmentProcessId
        };
        this.taskService.closeTaskBySaveTask(taskToBeClosed).subscribe({
          next: res=> {
            this.success(this.l('::Message:SuccessfulSave', this.l('::Documents:NamePlural')));
            this.fetchData();
            this.documentUploaded.emit();
            this.hideUploadDialog();
          }
        });
        
      }
    });
  }

  onSelect(event: any) {
    this.uploadedDocuments = [];
    for (let file of event.files) {
      this.uploadedDocuments.push(file);
      let document = {} as SavePatientDocumentDto;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (r) => {
        document.fileName = file.name;
        document.contentType = file.type;
        document.file = fileReader.result as string;
        this.documents.push(document);
      };
    }
  }

  openFile(file: any) {
    const url = window.URL.createObjectURL(file);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  }

  removeFile(file: any) {
    let index = this.uploadedDocuments.findIndex(f => f.name === file.name);
    this.uploadedDocuments = this.uploadedDocuments.filter(f => f.name !== file.name);
    this.documents = this.documents.filter(d => d.fileName !== file.name);
    this.documentUpload.remove(null, index);
  }

  hideUploadDialog() {
    this.selectedDocumentTypeId = null;
    this.documentDescription = null;
    this.documents = [];
    this.uploadedDocuments = [];
    this.documentUpload.clear();
    this.displayUploadDialog = false;
  }

  deleteAppointment(appointment: SMCIInterpreterAppointmentDto) {
    this.salesInfoAndCompanionInfo.interpreterAppointments = this.salesInfoAndCompanionInfo.interpreterAppointments.filter(a => !(a.appointmentDate == appointment.appointmentDate && a.branchId == appointment.branchId && a.description == appointment.description));
  }

  openNewAppointment() {
    this.appointment = {} as SMCIInterpreterAppointmentDto;
    this.displayAppointmentDialog = true;
  }

  saveAppointment() {
    this.appointment.salesMethodAndCompanionInfoId = this.salesInfoAndCompanionInfo.id;
    this.appointment.branch = this.branchList.find(b=>b.id == this.appointment.branchId);
    this.salesInfoAndCompanionInfo.interpreterAppointments.push(this.appointment);
    this.hideAppointmentDialog();
  }

  hideAppointmentDialog() {
    this.appointment = null;
    this.displayAppointmentDialog = false;
  }

}
