import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BranchDto } from '@proxy/dto/branch';
import { HospitalConsultationDto } from '@proxy/dto/hospital-consultation';
import { HospitalConsultationDocumentDto } from '@proxy/dto/hospital-consultation-document';
import { SaveHospitalResponseDto } from '@proxy/dto/hospital-response';
import { SaveHospitalResponseProcessDto } from '@proxy/dto/hospital-response-process';
import { HospitalResponseTypeDto } from '@proxy/dto/hospital-response-type';
import { HospitalizationTypeDto } from '@proxy/dto/hospitalization-type';
import { PatientDto } from '@proxy/dto/patient';
import { ProcessDto } from '@proxy/dto/process';
import { EntityEnum_HospitalResponseTypeEnum, EntityEnum_ProcessTypeEnum } from '@proxy/enum';
import { HospitalConsultationDocumentService, HospitalConsultationService, HospitalResponseService, HospitalResponseTypeService, HospitalizationTypeService, ProcessService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-hospital-response',
  templateUrl: './hospital-response.component.html',
  styleUrls: ['./hospital-response.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HospitalResponseComponent extends AppComponentBase {

  consultationId: number;
  consultation: HospitalConsultationDto;
  patient: PatientDto;
  documents: HospitalConsultationDocumentDto[] = [];
  hospitalResponseTypeList: HospitalResponseTypeDto[] = [];
  hospitalizationTypeList: HospitalizationTypeDto[] = [];
  branchList: BranchDto[] = [];
  selectedHospitalResponseType: number;
  selectedHospitalizationType: HospitalizationTypeDto;
  selectedBranches: BranchDto[] = [];
  anticipatedProcesses: SaveHospitalResponseProcessWithDetailDto[] = [];
  totalAnticipatedProcesses: number = 0;
  anticipatedMaterials: SaveHospitalResponseProcessWithDetailDto[] = [];
  totalAnticipatedMaterials: number = 0;
  loading: boolean;
  totalRecords: number;
  isAllowedToManage: boolean = false;
  hospitalResponse = {} as SaveHospitalResponseDto;

  process: SaveHospitalResponseProcessWithDetailDto;
  processDialog: boolean = false;
  filteredProcesses: ProcessDto[] = [];
  filteredMaterials: ProcessDto[] = [];

  material: SaveHospitalResponseProcessWithDetailDto;
  materialDialog: boolean = false;

  today = new Date();

  public hospitalResponseTypeEnum = EntityEnum_HospitalResponseTypeEnum;
  public processTypeEnum = EntityEnum_ProcessTypeEnum;

  constructor(
    injector: Injector,
    private hostipalResponseTypeService: HospitalResponseTypeService,
    private hospitalizationTypeService: HospitalizationTypeService,
    private hospitalConsultationService: HospitalConsultationService,
    private hospitalConsultationDocumentService: HospitalConsultationDocumentService,
    private hospitalResponseService: HospitalResponseService,
    private commonService: CommonService,
    private processService: ProcessService,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit() {
    const base64param = this.route.snapshot.paramMap.get('uid')!.split('.')[1];
    if (base64param) {
      try {
        const uid = atob(base64param);
        if (uid && !isNaN(+uid)) {
          this.consultationId = +uid;
          this.hospitalResponse.hospitalConsultationId = this.consultationId;
          this.hospitalResponse.hospitalResponseBranches = [];
          this.hospitalResponse.hospitalResponseProcesses = [];
          this.fetchData();
        }
        else {
          this.error(this.l('::HTS:28'));
        }
      } catch (error) {
        this.error(this.l('::HTS:28'));
      }
    }
  }

  fetchData() {
    this.loading = true;
    this.branchList = this.commonService.branchList;
    forkJoin([
      this.hospitalConsultationService.get(this.consultationId),
      this.hostipalResponseTypeService.getList(),
      this.hospitalizationTypeService.getList(),
    ]).subscribe(
      {
        next: ([
          resConsultation,
          resHospitalResponseTypeList,
          resHospitalizationTypeList
        ]) => {
          this.consultation = resConsultation;
          this.documents.push(...this.consultation.hospitalConsultationDocuments);
          this.hospitalResponseTypeList = resHospitalResponseTypeList.items;
          this.hospitalizationTypeList = resHospitalizationTypeList.items;
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

  filterProcess(event: any) {
    let query = event.query;
    this.processService.getListByKeyword(query, EntityEnum_ProcessTypeEnum.SutCode).subscribe({
      next: (res) => {
        this.filteredProcesses = res.items;
      }
    });
  }

  filterMaterial(event: any) {
    let query = event.query;
    this.processService.getListByKeyword(query, EntityEnum_ProcessTypeEnum.Material).subscribe({
      next: (res) => {
        this.filteredMaterials = res.items;
      }
    });
  }

  showFile(documentId: number) {
    this.hospitalConsultationDocumentService.get(documentId).subscribe({
      next: r => {
        const source = `data:${r.contentType};base64,${r.file}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = r.fileName
        link.click();
      }
    });
  }

  openNewMaterial() {
    this.material = new SaveHospitalResponseProcessWithDetailDto();
    this.materialDialog = true;
  }

  saveMaterial() {
    this.material.processId = this.material.process.id;
    this.totalAnticipatedMaterials = this.anticipatedMaterials.push(this.material);
    this.material = null;
    this.materialDialog = false;
  }

  deleteMaterial(material: SaveHospitalResponseProcessWithDetailDto) {
    this.anticipatedMaterials = this.anticipatedMaterials.filter(m => !(m.processId == material.processId && m.amount == material.amount));
    this.totalAnticipatedMaterials = this.anticipatedMaterials.length;
  }

  hideMaterialDialog() {
    this.material = null;
    this.materialDialog = false;
  }

  openNewProcess() {
    this.process = new SaveHospitalResponseProcessWithDetailDto();
    this.processDialog = true;
  }

  saveProcess() {
    this.process.processId = this.process.process.id;
    this.totalAnticipatedProcesses = this.anticipatedProcesses.push(this.process);

    this.process = null;
    this.processDialog = false;
  }

  deleteProcess(process: SaveHospitalResponseProcessWithDetailDto) {
    this.anticipatedProcesses = this.anticipatedProcesses.filter(m => !(m.processId == process.processId && m.amount == process.amount));
    this.totalAnticipatedProcesses = this.anticipatedProcesses.length;
  }

  hideProcessDialog() {
    this.process = null;
    this.processDialog = false;
  }

  onResponseSend() {
    this.confirm({
      key: 'hospitalResponseConfirm',
      message: this.l('::HospitalResponse:Message:SaveConfirm'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hospitalResponse.hospitalResponseTypeId = this.selectedHospitalResponseType;

        this.hospitalResponse.hospitalizationTypeId = this.selectedHospitalizationType ? this.selectedHospitalizationType.id : null;
        this.hospitalResponse.hospitalResponseBranches = [];
        this.selectedBranches?.forEach(branch => {
          this.hospitalResponse.hospitalResponseBranches.push({
            hospitalResponseId: 0,
            branchId: branch.id
          });
        });
        this.hospitalResponse.hospitalResponseProcesses = [];
        this.hospitalResponse.hospitalResponseProcesses.push(...this.anticipatedProcesses);
        this.hospitalResponse.hospitalResponseProcesses.push(...this.anticipatedMaterials);

        this.hospitalResponseService.create(this.hospitalResponse).subscribe({
          complete: () => {
            this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Hospital:Name')));
          }
        });
      }
    });
  }
}

class SaveHospitalResponseProcessWithDetailDto implements SaveHospitalResponseProcessDto {
  hospitalResponseId: number;
  processId: number;
  amount: number;
  process: ProcessDto;
}
