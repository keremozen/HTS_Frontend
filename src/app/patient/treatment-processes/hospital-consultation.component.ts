import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { DocumentTypeDto } from '@proxy/dto/document-type';
import { HospitalDto } from '@proxy/dto/hospital';
import { IPatientDocument, PatientDocument } from 'src/app/models/patient/patientDocument.model';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-hospital-consultation',
  templateUrl: './hospital-consultation.component.html',
  styleUrls: ['./hospital-consultation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalConsultationComponent extends AppComponentBase {

  consultations: any[] = [];
  consultationDialog: boolean = false;
  hospitalList: HospitalDto[] = [];
  selectedHospitals: HospitalDto[] = [];
  documentDialog: boolean = false;
  document: IPatientDocument;
  documentTypeList: DocumentTypeDto[] = [];
  uploadedDocuments: any[] = [];
  documents: IPatientDocument[] = [];
  loading: boolean;
  totalRecords: number = 0;

  constructor(
    injector: Injector
  ) {
    super(injector);

    //TODO: Kerem silinecek
    this.consultations.push({
      ConsultationNo: 1,
      CreatedBy: "Kerem Özen",
      Created: new Date(),
      Hospital: "Memorial Ankara Hastanesi",
      State: "Cevap Bekleniyor"
    });

  }

  onNewConsultation() {
    this.consultationDialog = true;
  }

  hideConsultationDialog() {
    this.consultationDialog = false;
  }

  saveConsultation() {

  }

  openConsultation() {

  }

  openAnswer() {

  }

  approve() {

  }

  reject() {

  }

  openNewDocument() {
    this.documentDialog = true;
    this.document = new PatientDocument();
  }

  hideDocumentDialog() {
    this.documentDialog = false;
    this.uploadedDocuments = [];
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
        this.hideDocumentDialog();
      }
    };
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
    //this.documentUpload.clear();
  }
}
