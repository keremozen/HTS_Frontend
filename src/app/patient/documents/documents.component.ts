import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Form } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { IDocumentType } from 'src/app/models/documentType.model';
import { IPatientDocument, PatientDocument } from 'src/app/models/patient/patientDocument.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentsComponent extends AppComponentBase {
  documents: IPatientDocument[] = [];
  selectedDocuments: any[];
  documentDialog: boolean = false;
  document: IPatientDocument;
  showRevokedRecords: boolean = false;
  revokedRecordCount: number = 0;
  documentTypeList: IDocumentType[] = [];
  uploadedDocuments: any[] = [];
  @ViewChild("documents", { static: false }) documentUpload: FileUpload;
  @ViewChild("documentForm", {static:false}) documentForm: Form;

  constructor(
    injector: Injector
  ) {
    super(injector);

    this.documentTypeList.push({
      Id: 1,
      Name: "Belge Tipi 1",
      Description: "Örnek Belge Tipidir"
    });

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

  revokeSelected() {
    if (this.selectedDocuments.length > 0) {
      this.confirm({
        message: this.l('::Message:RevokeMultipleConfirmation'),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.documents = this.documents.filter(val => !this.selectedDocuments.map(n => n.Id).includes(val.Id));
          this.success(this.l('::Message:SuccessfulMultipleRevokation', this.l('::Documents:NamePlural')));
        }
      });
    }
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
