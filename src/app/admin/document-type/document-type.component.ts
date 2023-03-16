import { Component, Injector } from '@angular/core';
import { IDocumentType, DocumentType } from 'src/app/models/documentType.model';
import { DocumentTypeService } from 'src/app/services/documentType.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent extends AppComponentBase {
  documentTypeDialog: boolean;
  documentTypeList: IDocumentType[];
  documentType: DocumentType;
  submitted: boolean;

  constructor(
    injector: Injector,
    private documentTypeService: DocumentTypeService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.documentTypeService.getDocumentTypeList().subscribe(data => this.documentTypeList = data);
  }

  openNewDocumentType() {
    this.documentType = new DocumentType();
    this.submitted = false;
    this.documentTypeDialog = true;
  }

  editDocumentType(documentType: DocumentType) {
    this.documentType = { ...documentType };
    this.documentTypeDialog = true;
  }

  deleteDocumentType(documentType: DocumentType) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', documentType.Name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documentTypeList = this.documentTypeList.filter(val => val.Id !== documentType.Id);
        this.documentType = null;
        this.success(this.l("::ToastTitle:Successful"), this.l('::Message:SuccessfulDeletion', this.l('::Admin:DocumentType:Name')));
      }
    });
  }

  hideDialog() {
    this.documentTypeDialog = false;
    this.submitted = false;
  }

  saveDocumentType() {
    this.submitted = true;
  }
}
