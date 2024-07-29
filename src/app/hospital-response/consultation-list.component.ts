import { Location } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { BranchDto } from '@proxy/dto/branch';
import { DocumentTypeDto } from '@proxy/dto/document-type';
import { HospitalDto } from '@proxy/dto/hospital';
import { HospitalConsultationDto, SaveHospitalConsultationDto } from '@proxy/dto/hospital-consultation';
import { HospitalConsultationDocumentDto, SaveHospitalConsultationDocumentDto } from '@proxy/dto/hospital-consultation-document';
import { HospitalResponseDto } from '@proxy/dto/hospital-response';
import { HospitalResponseProcessDto } from '@proxy/dto/hospital-response-process';
import { HospitalResponseTypeDto } from '@proxy/dto/hospital-response-type';
import { HospitalizationTypeDto } from '@proxy/dto/hospitalization-type';
import { EntityEnum_HospitalConsultationStatusEnum, EntityEnum_PatientDocumentStatusEnum, EntityEnum_PatientNoteStatusEnum, EntityEnum_ProcessTypeEnum } from '@proxy/enum';
import { HospitalConsultationService, HospitalResponseService, PatientDocumentService, PatientNoteService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultationListComponent extends AppComponentBase {

  hospitalId: number;
  consultations: HospitalConsultationDto[] = [];

  hospitalConsultation: SaveHospitalConsultationDto;
  hospitalList: HospitalDto[] = [];
  selectedHospitals: number[] = [];
  consolidatedDescription: string;
  hospitalResponse: HospitalResponseDto;
  anticipatedProcesses: HospitalResponseProcessDto[] = [];
  anticipatedMaterials: HospitalResponseProcessDto[] = [];
  isConsultationReadOnly: boolean = false;
  totalConsultations: number = 0;
  totalConsultationDocuments: number = 0;
  hospitalResponseDialog: boolean = false;
  consultationDialog: boolean = false;
  public consultationStatusEnum = EntityEnum_HospitalConsultationStatusEnum;
  public patientDocumentStatusEnum = EntityEnum_PatientDocumentStatusEnum;
  public processTypeEnum = EntityEnum_ProcessTypeEnum;
  branchList: BranchDto[] = [];
  hospitalizationTypeList: HospitalizationTypeDto[] = [];
  hospitalResponseTypeList: HospitalResponseTypeDto[] = [];
  branchListText: string;
  doesHaveAnyApproved: boolean;

  // Document Related variables
  documentTypeList: DocumentTypeDto[] = [];
  uploadedDocuments: any[] = [];
  hospitalConsultationDocuments: HospitalConsultationDocumentDto[] = [];
  hospitalConsultationDocument: HospitalConsultationDocumentDto;
  hospitalConsultationDocumentDialog: boolean = false;

  @Output() onConsultationChange: EventEmitter<any> = new EventEmitter();

  constructor(
    injector: Injector,
    private location: Location,
    private patientDocumentService: PatientDocumentService,
    private commonService: CommonService,
    private patientNoteService: PatientNoteService,
    private hospitalConsultationService: HospitalConsultationService,
    private hospitalResponseService: HospitalResponseService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.hospitalId = this.location.getState()[0];
    this.hospitalList = this.commonService.hospitalList;
    if (this.hospitalId) {
      this.hospitalConsultationService.getByHospitalId(this.hospitalId).subscribe({
        next: res => {
          this.consultations = res.items;
        }
      });
    }
  }

  getHospitalName(hospitalId: number): string {
    return this.hospitalList.find(h => h.id == hospitalId)?.name;
  }

  openConsultation(consultationId: number) {
    this.router.navigate(['/hospital-response/', this.makeRandomString(8) + '.' + btoa(consultationId.toString())]);
  }

  makeRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

}
