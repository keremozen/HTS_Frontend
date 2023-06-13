import { Component, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form } from '@angular/forms';
import { DocumentTypeDto } from '@proxy/dto/document-type';
import { PatientDocumentDto, SavePatientDocumentDto } from '@proxy/dto/patient-document';
import { EntityEnum_PatientDocumentStatusEnum } from '@proxy/enum';
import { DocumentTypeService, PatientDocumentService } from '@proxy/service';
import { FileUpload } from 'primeng/fileupload';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentsComponent extends AppComponentBase {
  @Input() patientId: number;
  allDocuments: PatientDocumentDto[] = [];
  documentsToBeDisplayed: PatientDocumentDto[] = [];
  documentDialog: boolean = false;
  document: SavePatientDocumentDto;
  showRevokedRecords: boolean = false;
  revokedRecordCount: number = 0;
  documentTypeList: DocumentTypeDto[] = [];
  uploadedDocuments: any[] = [];
  loading: boolean;
  totalRecords: number = 0;
  public patientDocumentStatusEnum = EntityEnum_PatientDocumentStatusEnum;
  @ViewChild("documents", { static: false }) documentUpload: FileUpload;
  @ViewChild("documentForm", {static:false}) documentForm: Form;

  constructor(
    injector: Injector,
    private commonService: CommonService,
    private documentService: PatientDocumentService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.documentTypeList = this.commonService.documentTypeList;
    this.documentService.getList(this.patientId).subscribe({
      next: (resDocumentList) => {
        this.allDocuments = resDocumentList.items;
        this.revokedRecordCount = resDocumentList.items.filter(d => d.patientDocumentStatusId === this.patientDocumentStatusEnum.Revoked).length;
        this.manageDocumentsToBeDisplayed();
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
    
  }

  manageDocumentsToBeDisplayed() {
    if (!this.showRevokedRecords) {
      this.documentsToBeDisplayed = [...this.allDocuments.filter(n => n.patientDocumentStatusId !== EntityEnum_PatientDocumentStatusEnum.Revoked)];
    }
    else {
      this.documentsToBeDisplayed = [...this.allDocuments];
    }
    this.totalRecords = this.documentsToBeDisplayed.length;
  }

  openNew() {
    this.document = {} as SavePatientDocumentDto;
    this.document.patientId = this.patientId;
    this.documentDialog = true;
  }

  saveDocument() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.uploadedDocuments[0]);
    fileReader.onload = (r) => {
      if (this.document) {
        this.document.fileName = this.uploadedDocuments[0].name;
        this.document.file = fileReader.result as string;
        this.documentService.create(this.document).subscribe({
          next: (res) => {
            this.success(this.l('::Message:SuccessfulSave', this.l('::Documents:NameSingular')));
            this.fetchData();
            this.hideDialog();
          }
        });
      }
    };
  }

  hideDialog() {
    this.document = null;
    this.uploadedDocuments = [];
    this.documentDialog = false;
  }

  revokeDocument(documentsToBeRevoked: PatientDocumentDto) {
    this.confirm({
      key: 'documentConfirm',
      message: this.l('::Message:RevokeConfirmation'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documentService.updateStatusByIdAndStatusId(documentsToBeRevoked.id as unknown as number, this.patientDocumentStatusEnum.Revoked).subscribe({
          next: (res) => {
            this.success(this.l('::Message:SuccessfulRevokation', this.l('::Documents:NameSingular')));
            this.fetchData();
          }
        });
        
      }
    });
  }

  onSelect(event: any) {
    this.uploadedDocuments = [];
    for (let file of event.files) {
      this.uploadedDocuments.push(file);
    }
  }

  openFile(file: any) {
    const url = window.URL.createObjectURL(file);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  }

  removeFile() {
    this.uploadedDocuments = [];
    this.documentUpload.clear();
  }

  onShowRevokedRecords() {
    this.manageDocumentsToBeDisplayed();
  }
}
