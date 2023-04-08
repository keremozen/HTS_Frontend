import { Component, Injector, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form } from '@angular/forms';
import { DocumentTypeDto } from '@proxy/dto/document-type';
import { DocumentTypeService } from '@proxy/service';
import { FileUpload } from 'primeng/fileupload';
import { forkJoin } from 'rxjs';
import { IPatientDocument, PatientDocument } from 'src/app/models/patient/patientDocument.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentsComponent extends AppComponentBase {
  @Input() patientId: number;
  documents: IPatientDocument[] = [];
  documentDialog: boolean = false;
  document: IPatientDocument;
  showRevokedRecords: boolean = false;
  revokedRecordCount: number = 0;
  documentTypeList: DocumentTypeDto[] = [];
  uploadedDocuments: any[] = [];
  loading: boolean;
  totalRecords: number = 0;
  @ViewChild("documents", { static: false }) documentUpload: FileUpload;
  @ViewChild("documentForm", {static:false}) documentForm: Form;

  constructor(
    injector: Injector,
    private documentTypeService: DocumentTypeService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    forkJoin([
      this.documentTypeService.getList()
    ]).subscribe(
      {
        next: ([
          resDocumentTypeList
        ]) => {
          this.documentTypeList = resDocumentTypeList.items;
          this.totalRecords = resDocumentTypeList.totalCount;
        }
      }
    );
  }

  openNew() {
    this.document = new PatientDocument();
    this.documentDialog = true;
  }

  saveDocument() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.uploadedDocuments[0]);
    fileReader.onload = (r) => {
      if (this.document) {
        this.document.FileName = this.uploadedDocuments[0].name;
        this.document.Content = fileReader.result as string;
        this.document.Created = new Date();
        this.document.CreatedBy = "Kerem Özen";
        this.documents.push(this.document);
        this.success(this.l('::Message:SuccessfulSave', this.l('::Documents:NameSingular')));
        this.hideDialog();
      }
    };
  }

  hideDialog() {
    this.document = null;
    this.uploadedDocuments = [];
    this.documentDialog = false;
  }

  revokeDocument(documentsToBeRevoked: IPatientDocument) {
    this.confirm({
      message: this.l('::Message:RevokeConfirmation'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documents = this.documents.filter(val => val.Id !== documentsToBeRevoked.Id);
        this.success(this.l('::Message:SuccessfulRevokation', this.l('::Documents:NameSingular')));
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
}
