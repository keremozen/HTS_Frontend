import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IDocumentType, DocumentType } from 'src/app/models/documentType.model';
import { DocumentTypeService } from 'src/app/services/documentType.service';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent {
  documentTypeDialog: boolean;
  documentTypeList: IDocumentType[];
  documentType: DocumentType;
  submitted: boolean;

  constructor(
    private documentTypeService: DocumentTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private l: LocalizationService
  ) { }

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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + documentType.Name + '?',
      header: this.l.instant('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documentTypeList = this.documentTypeList.filter(val => val.Id !== documentType.Id);
        this.documentType = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Type Deleted', life: 3000 });
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
