import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Process } from '@proxy/dto';
import { BranchDto } from '@proxy/dto/branch';
import { HospitalConsultationDto } from '@proxy/dto/hospital-consultation';
import { HospitalConsultationDocumentDto, SaveHospitalConsultationDocumentDto } from '@proxy/dto/hospital-consultation-document';
import { SaveHospitalResponseDto } from '@proxy/dto/hospital-response';
import { HospitalResponseMaterialDto, SaveHospitalResponseMaterialDto } from '@proxy/dto/hospital-response-material';
import { HospitalResponseProcessDto, SaveHospitalResponseProcessDto } from '@proxy/dto/hospital-response-process';
import { HospitalResponseTypeDto } from '@proxy/dto/hospital-response-type';
import { HospitalizationTypeDto } from '@proxy/dto/hospitalization-type';
import { MaterialDto } from '@proxy/dto/material';
import { PatientDto } from '@proxy/dto/patient';
import { ProcessDto } from '@proxy/dto/process';
import { EntityEnum_HospitalResponseTypeEnum } from '@proxy/enum';
import { BranchService, HospitalConsultationService, HospitalResponseService, HospitalResponseTypeService, HospitalizationTypeService, MaterialService, ProcessService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

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
  selectedHospitalResponseType: HospitalResponseTypeDto;
  selectedHospitalizationType: HospitalizationTypeDto;
  selectedBranches: BranchDto[] = [];
  anticipatedProcesses: SaveHospitalResponseProcessWithDetailDto[] = [];
  anticipatedMaterials: SaveHospitalResponseMaterialWithDetailDto[] = [];
  loading: boolean;
  totalRecords: number;
  isAllowedToManage: boolean = false;
  hospitalResponse = {} as SaveHospitalResponseDto;

  material: SaveHospitalResponseMaterialWithDetailDto;
  materialDialog: boolean = false;
  materialList: MaterialDto[] = [];

  process: SaveHospitalResponseProcessWithDetailDto;
  processDialog: boolean = false;
  processList: ProcessDto[] = [];

  public hospitalResponseTypeEnum = EntityEnum_HospitalResponseTypeEnum;

  constructor(
    injector: Injector,
    private hostipalResponseTypeService: HospitalResponseTypeService,
    private hospitalizationTypeService: HospitalizationTypeService,
    private hospitalConsultationService: HospitalConsultationService,
    private hospitalResponseService: HospitalResponseService,
    private branchService: BranchService,
    private processService: ProcessService,
    private materialService: MaterialService,
    private route: ActivatedRoute,
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('uid')) {
      this.consultationId = +this.route.snapshot.paramMap.get('uid');
      this.hospitalResponse.hospitalConsultationId = this.consultationId;
      this.hospitalResponse.hospitalResponseBranches = [];
      this.hospitalResponse.hospitalResponseMaterials = [];
      this.hospitalResponse.hospitalResponseProcesses = [];
      this.fetchData();
    }
  }

  fetchData() {
    this.loading = true;
    forkJoin([
      this.hospitalConsultationService.get(this.consultationId),
      this.hostipalResponseTypeService.getList(),
      this.hospitalizationTypeService.getList(),
      this.branchService.getList(),
      this.processService.getList(),
      this.materialService.getList()
    ]).subscribe(
      {
        next: ([
          resConsultation,
          resHospitalResponseTypeList,
          resHospitalizationTypeList,
          resBranchList,
          resProcessList,
          resMaterialList
        ]) => {
          this.consultation = resConsultation;
          this.documents.push(...this.consultation.hospitalConsultationDocuments);
          this.hospitalResponseTypeList = resHospitalResponseTypeList.items;
          this.hospitalizationTypeList = resHospitalizationTypeList.items;
          this.branchList = resBranchList.items;
          this.processList = resProcessList.items;
          this.materialList = resMaterialList.items;
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

  openNewMaterial() {
    this.material = new SaveHospitalResponseMaterialWithDetailDto();
    this.materialDialog = true;
  }

  saveMaterial() {
    debugger;
    this.material.materialId = this.material.material.id;
    this.anticipatedMaterials.push(this.material);
    this.material = null;
    this.materialDialog = false;
  }

  deleteMaterial(material: SaveHospitalResponseMaterialWithDetailDto) {
    this.anticipatedMaterials = this.anticipatedMaterials.filter(m=>!(m.materialId == material.materialId && m.amount == material.amount));
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
    debugger;
    this.process.processId = this.process.process.id;
    this.anticipatedProcesses.push(this.process);
    this.process = null;
    this.processDialog = false;
  }

  deleteProcess(process: SaveHospitalResponseProcessWithDetailDto) {
    this.anticipatedProcesses = this.anticipatedProcesses.filter(m=>!(m.processId == process.processId && m.amount == process.amount));
  }

  hideProcessDialog() {
    this.process = null;
    this.processDialog = false;
  }

  onResponseSend() {
    this.hospitalResponse.hospitalResponseTypeId = this.selectedHospitalResponseType.id;
    this.hospitalResponse.hospitalizationTypeId = this.selectedHospitalizationType.id;
    this.selectedBranches.forEach(branch => {
      this.hospitalResponse.hospitalResponseBranches.push({
        hospitalResponseId: 0,
        branchId: branch.id
      });
    });
    this.hospitalResponse.hospitalResponseProcesses = this.anticipatedProcesses;
    this.hospitalResponse.hospitalResponseMaterials = this.anticipatedMaterials;

    this.hospitalResponseService.create(this.hospitalResponse).subscribe({
      complete: () => {
        this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Hospital:Name')));
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

class SaveHospitalResponseMaterialWithDetailDto implements SaveHospitalResponseMaterialDto {
  hospitalResponseId: number;
  materialId: number;
  amount: number;
  material: MaterialDto;
}

