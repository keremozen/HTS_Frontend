import { Component, Injector } from '@angular/core';
import { DocumentTypeDto, SaveDocumentTypeDto } from '@proxy/dto/document-type';
import { DocumentTypeService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent extends AppComponentBase {
  documentTypeDialog: boolean;
  documentTypeList: DocumentTypeDto[];
  documentType: SaveDocumentTypeDto;
  isEdit: boolean;
  documentTypeToBeEdited: DocumentTypeDto;
  loading: boolean;
  totalRecords: number = 0;

  constructor(
    injector: Injector,
    private documentTypeService: DocumentTypeService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.documentTypeService.getList().subscribe({
      next: data => {
        this.documentTypeList = data.items;
        this.totalRecords = data.totalCount;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openNewDocumentType() {
    this.isEdit = false;
    this.documentType = {} as SaveDocumentTypeDto;
    this.documentType.isActive = true;
    this.documentTypeDialog = true;
  }

  editDocumentType(documentType: DocumentTypeDto) {
    this.isEdit = true;
    this.documentTypeToBeEdited = documentType;
    this.documentType = { ...documentType as SaveDocumentTypeDto };
    this.documentTypeDialog = true;
  }

  deleteDocumentType(documentType: DocumentTypeDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', documentType.name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documentTypeService.delete(documentType.id).subscribe({
          next: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:DocumentType:Name')));
            this.fetchData();
            this.hideDialog();
          }
        });
      }
    });
  }

  saveDocumentType() {
    if (!this.isEdit) {
      this.documentTypeService.create(this.documentType).subscribe({
        next: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:DocumentType:Name')));
        },
        error: (error: any) => {
          this.hideDialog();
        }
      });
    }
    else {
      this.documentTypeService.update(this.documentTypeToBeEdited.id, this.documentType).subscribe({
        next: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:DocumentType:Name')));
        },
        error: (error: any) => {
          this.hideDialog();
        }
      });
    }
  }

  hideDialog() {
    this.documentType = null;
    this.documentTypeToBeEdited = null;
    this.documentTypeDialog = false;
  }
}
