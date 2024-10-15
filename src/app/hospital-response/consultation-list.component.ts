import { IdentityUserDto } from '@abp/ng.identity/proxy';
import { Location } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output, ViewEncapsulation } from '@angular/core';
import { BranchDto } from '@proxy/dto/branch';
import { DocumentTypeDto } from '@proxy/dto/document-type';
import { HospitalDto } from '@proxy/dto/hospital';
import { HospitalConsultationDto, SaveHospitalConsultationDto } from '@proxy/dto/hospital-consultation';
import { HospitalConsultationDocumentDto, SaveHospitalConsultationDocumentDto } from '@proxy/dto/hospital-consultation-document';
import { HospitalConsultationStatusDto } from '@proxy/dto/hospital-consultation-status';
import { HospitalResponseDto } from '@proxy/dto/hospital-response';
import { HospitalResponseProcessDto } from '@proxy/dto/hospital-response-process';
import { HospitalResponseTypeDto } from '@proxy/dto/hospital-response-type';
import { HospitalizationTypeDto } from '@proxy/dto/hospitalization-type';
import { PatientTreatmentProcessDto } from '@proxy/dto/patient-treatment-process';
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
  consultations: HospitalConsultationWithResponseDto[] = [];
  responses: HospitalResponseDto[] = [];
  hospitalList: HospitalDto[] = [];
  totalConsultations: number = 0;
  public processTypeEnum = EntityEnum_ProcessTypeEnum;
  @Output() onConsultationChange: EventEmitter<any> = new EventEmitter();

  constructor(
    injector: Injector,
    private location: Location,
    private commonService: CommonService,
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
      this.hospitalResponseService.getByHospitalId(this.hospitalId).subscribe({
        next: resResponse => {
          this.responses = resResponse.items;
        },
        complete: () => {
          this.hospitalConsultationService.getByHospitalId(this.hospitalId).subscribe({
            next: res => {
              this.consultations = res.items as HospitalConsultationWithResponseDto[];
              this.consultations.forEach(consultation => {
                consultation.hospitalResponse = this.responses.find(r=>r.hospitalConsultation.hospitalId == consultation.hospitalId);
              });
            }
          });
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

class HospitalConsultationWithResponseDto implements HospitalConsultationDto {
  note?: string;
  patientTreatmentProcessId: number;
  hospitalId: number;
  rowNumber: number;
  hospitalConsultationStatusId: EntityEnum_HospitalConsultationStatusEnum;
  hospitalConsultationStatus: HospitalConsultationStatusDto;
  hospitalConsultationDocuments: HospitalConsultationDocumentDto[];
  hospital: HospitalDto;
  patientTreatmentProcess: PatientTreatmentProcessDto;
  creator?: number;
  lastModifier?: number;
  lastModificationTime?: string | Date;
  lastModifierId?: string;
  creationTime?: string | Date;
  creatorId?: string;
  id?: IdentityUserDto;
  hospitalResponse: HospitalResponseDto;
}