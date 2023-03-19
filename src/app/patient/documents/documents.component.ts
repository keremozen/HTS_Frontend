import { Component, Injector, ViewEncapsulation } from '@angular/core';
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
  revokedRecordCount:number = 0;

  constructor(
    injector: Injector
  ) {
    super(injector);

  }

  openNew() {
    this.document = new PatientDocument();
    this.documentDialog = true;
  }

  saveDocument() {
    this.document.Created = new Date();
    this.document.CreatedBy = "Kerem Özen";
    this.documents.push(this.document);
    this.success(this.l('::Message:SuccessfulSave', this.l('::Documents:NameSingular')));
    this.hideDialog();
  }

  hideDialog() {
    this.document = null;
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
}
