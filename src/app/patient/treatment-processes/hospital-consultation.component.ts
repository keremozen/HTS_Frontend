import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { DocumentTypeDto } from '@proxy/dto/document-type';
import { HospitalDto } from '@proxy/dto/hospital';
import { HospitalResponseDto } from '@proxy/dto/hospital-response';
import { PatientDocumentDto } from '@proxy/dto/patient-document';
import { ProcessDto } from '@proxy/dto/process';
import { EntityEnum_PatientNoteStatusEnum } from '@proxy/enum';
import { HospitalService, PatientNoteService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-hospital-consultation',
  templateUrl: './hospital-consultation.component.html',
  styleUrls: ['./hospital-consultation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalConsultationComponent extends AppComponentBase {

  @Input() patientId: number;
  consultations: any[] = [];
  consultationDialog: boolean = false;
  hospitalList: HospitalDto[] = [];
  selectedHospitals: HospitalDto[] = [];
  consolidatedDescription: string;
  documentDialog: boolean = false;
  hospitalResponseDialog: boolean = false;
  document: PatientDocumentDto;
  documentTypeList: DocumentTypeDto[] = [];
  uploadedDocuments: any[] = [];
  documents: PatientDocumentDto[] = [];
  hospitalResponse: HospitalResponseDto;
  anticipatedProcesses: ProcessDto[] = [];
  anticipatedSupplies: any[] = [];
  loading: boolean;
  totalRecords: number = 0;

  constructor(
    injector: Injector,
    private hospitalService: HospitalService,
    private patientNoteService: PatientNoteService
  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    forkJoin([
      this.hospitalService.getList(),
      this.patientNoteService.getList(this.patientId)
    ]).subscribe(
      {
        next: ([
          resHospitalList,
          resNoteList
        ]) => {
          this.hospitalList = resHospitalList.items;

          this.consolidatedDescription = resNoteList.items.filter(n => n.patientNoteStatusId != EntityEnum_PatientNoteStatusEnum.Revoked).map(n => n.note).join("\n");
          debugger;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      }
    );
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

  openHospitalResponse() {
    this.hospitalResponseDialog = true;
  }

  hideHospitalResponseDialog() {
    this.hospitalResponseDialog = false;
  }

  approve() {

  }

  reject() {

  }

  openNewDocument() {
    this.documentDialog = true;
    this.document = {} as PatientDocumentDto;
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
        this.document.fileName = this.uploadedDocuments[0].name;
        // this.document.content = fileReader.result as string;
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
