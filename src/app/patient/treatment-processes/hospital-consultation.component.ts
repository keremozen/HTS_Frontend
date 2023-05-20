import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { DocumentTypeDto } from '@proxy/dto/document-type';
import { HospitalDto } from '@proxy/dto/hospital';
import { HospitalConsultationDto, SaveHospitalConsultationDto } from '@proxy/dto/hospital-consultation';
import { HospitalConsultationDocumentDto, SaveHospitalConsultationDocumentDto } from '@proxy/dto/hospital-consultation-document';
import { HospitalResponseDto } from '@proxy/dto/hospital-response';
import { MaterialDto } from '@proxy/dto/material';
import { ProcessDto } from '@proxy/dto/process';
import { EntityEnum_HospitalConsultationStatusEnum, EntityEnum_PatientDocumentStatusEnum, EntityEnum_PatientNoteStatusEnum } from '@proxy/enum';
import { DocumentTypeService, HospitalConsultationService, HospitalService, PatientDocumentService, PatientNoteService } from '@proxy/service';
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
  @Input() patientTreatmentId: number;

  consultations: HospitalConsultationDto[] = [];
  hospitalConsultation: SaveHospitalConsultationDto;
  hospitalList: HospitalDto[] = [];
  selectedHospitals: HospitalDto[] = [];
  consolidatedDescription: string;
  hospitalResponse: HospitalResponseDto;
  anticipatedProcesses: ProcessDto[] = [];
  anticipatedMaterials: MaterialDto[] = [];
  isConsultationReadOnly: boolean = false;
  loading: boolean;
  totalRecords: number = 0;
  hospitalResponseDialog: boolean = false;
  consultationDialog: boolean = false;
  public consultationStatusEnum = EntityEnum_HospitalConsultationStatusEnum;
  public patientDocumentStatusEnum = EntityEnum_PatientDocumentStatusEnum;

  // Document Related variables
  documentTypeList: DocumentTypeDto[] = [];
  uploadedDocuments: any[] = [];
  hospitalConsultationDocuments: SaveHospitalConsultationDocumentDto[] = [];
  hospitalConsultationDocument: SaveHospitalConsultationDocumentDto;
  hospitalConsultationDocumentDialog: boolean = false;

  constructor(
    injector: Injector,
    private patientDocumentService: PatientDocumentService,
    private documentTypeService: DocumentTypeService,
    private hospitalService: HospitalService,
    private patientNoteService: PatientNoteService,
    private hospitalConsultationService: HospitalConsultationService,
  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    forkJoin([
      this.documentTypeService.getList(),
      this.hospitalService.getList(),
      this.hospitalConsultationService.getByPatientTreatmenProcess(this.patientTreatmentId)
    ]).subscribe(
      {
        next: ([
          resDocumentTypeList,
          resHospitalList,
          resConsultationList
        ]) => {
          this.documentTypeList = resDocumentTypeList.items;
          this.hospitalList = resHospitalList.items;
          this.consultations = resConsultationList.items;
          this.totalRecords = resConsultationList.totalCount;
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

  getHospitalName(hospitalId: number): string {
    return this.hospitalList.find(h => h.id == hospitalId)?.name;
  }

  onNewConsultation() {
    this.hospitalConsultation = {} as SaveHospitalConsultationDto;
    this.hospitalConsultationDocuments = [];
    this.hospitalConsultation.patientTreatmentProcessId = this.patientTreatmentId;
    this.patientNoteService.getList(this.patientId).subscribe({
      next: (resNoteList) => {
        this.consolidatedDescription = resNoteList.items.filter(n => n.patientNoteStatusId != EntityEnum_PatientNoteStatusEnum.Revoked).map(n => n.note).join("\n");
        this.hospitalConsultation.note = this.consolidatedDescription;
      },
      complete: () => {
        this.consultationDialog = true;
      }
    });

  }

  hideConsultationDialog() {
    this.consolidatedDescription = null;
    this.selectedHospitals = [];
    this.consultationDialog = false;
  }

  saveConsultation() {
    this.hospitalConsultation.hospitalIds = this.selectedHospitals.map(h => h.id);
    this.hospitalConsultation.hospitalConsultationDocuments = this.hospitalConsultationDocuments as unknown as SaveHospitalConsultationDocumentDto[];
    this.hospitalConsultationService.create(this.hospitalConsultation).subscribe({
      complete: () => {
        this.success(this.l('::Message:SuccessfulSave', this.l('::HospitalConsultation:Title')));
        this.fetchData();
        this.hideConsultationDialog();
      }
    });
  }

  openConsultation(consultation: HospitalConsultationDto) {
    this.hospitalConsultation = consultation as unknown as SaveHospitalConsultationDto;
    this.selectedHospitals.push(this.hospitalList.find(h=>h.id == consultation.hospitalId));
    //TODO: Kerem documents dolacak
    this.isConsultationReadOnly = true;
    this.consultationDialog = true;
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

  importDocuments() {
    if (this.hospitalConsultationDocuments.length > 0) {
      this.confirm({
        key: 'hospitalConsultationDocumentConfirm',
        message: this.l('::Message:ImportDocumentConfirmation'),
        header: this.l('::Confirm'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.patientDocumentService.getList(this.patientId).subscribe({
            next: (res) => {
              this.hospitalConsultationDocuments = res.items.filter(n => n.patientDocumentStatusId !== EntityEnum_PatientDocumentStatusEnum.Revoked) as unknown as SaveHospitalConsultationDocumentDto[];
            }
          });
        }
      });
    }
    else {
      this.patientDocumentService.getList(this.patientId).subscribe({
        next: (res) => {
          this.hospitalConsultationDocuments = res.items.filter(n => n.patientDocumentStatusId !== EntityEnum_PatientDocumentStatusEnum.Revoked) as unknown as SaveHospitalConsultationDocumentDto[];
        }
      });
    }

  }

  openNewHospitalConsultationDocument() {
    this.hospitalConsultationDocument = {} as SaveHospitalConsultationDocumentDto;
    this.hospitalConsultationDocumentDialog = true;
  }

  hideHospitalConsultationDocumentDialog() {
    this.hospitalConsultationDocument = null;
    this.uploadedDocuments = [];
    this.hospitalConsultationDocumentDialog = false;
  }

  saveDocument() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.uploadedDocuments[0]);
    fileReader.onload = (r) => {
      if (this.hospitalConsultationDocument) {
        this.hospitalConsultationDocument.fileName = this.uploadedDocuments[0].name;
        this.hospitalConsultationDocument.file = (fileReader.result as string).split(',')[1];
        this.hospitalConsultationDocument.patientDocumentStatusId = EntityEnum_PatientDocumentStatusEnum.NewRecord;
        this.hospitalConsultationDocuments.push({ ...this.hospitalConsultationDocument });
        this.success(this.l('::Message:SuccessfulSave', this.l('::Documents:NameSingular')));
        this.hideHospitalConsultationDocumentDialog();
      }
    };
  }

  revokeDocument(documentToBeRevoked: HospitalConsultationDocumentDto) {
    this.confirm({
      key: 'hospitalConsultationDocumentConfirm',
      message: this.l('::Message:RevokeConfirmation'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hospitalConsultationDocuments = this.hospitalConsultationDocuments.filter(d => d.fileName != documentToBeRevoked.fileName);
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
    //this.documentUpload.clear();
  }
}
