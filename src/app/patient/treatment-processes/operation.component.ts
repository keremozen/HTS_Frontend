import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
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
import { HospitalResponseTypeService, HospitalizationTypeService, OperationService, ProcessService, TreatmentTypeService } from '@proxy/service';
import { Observable, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonService } from 'src/app/services/common.service';
import { HospitalDto } from '@proxy/dto/hospital';
import { OperationDto, SaveOperationDto } from '@proxy/dto/operation';
import { TreatmentTypeDto } from '@proxy/dto/treatment-type';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class OperationComponent extends AppComponentBase {

  patientTreatmentProcessId: number;
  patient: PatientDto;
  operation: SaveOperationDto;
  operationId: number;
  hospitalResponse: SaveHospitalResponseDto;
  hospitalList: HospitalDto[] = [];
  isManual: boolean;
  branchList: BranchDto[] = [];
  hospitalResponseTypeList: HospitalResponseTypeDto[] = [];
  hospitalizationTypeList: HospitalizationTypeDto[] = [];
  treatmentTypeList: TreatmentTypeDto[] = [];
  selectedTreatmentType: TreatmentTypeDto;
  selectedBranches: number[] = [];
  loading: boolean;
  public hospitalResponseTypeEnum = EntityEnum_HospitalResponseTypeEnum;
  public processTypeEnum = EntityEnum_ProcessTypeEnum;

  consultationId: number;
  consultation: HospitalConsultationDto;
  documents: HospitalConsultationDocumentDto[] = [];
  anticipatedProcesses: SaveHospitalResponseProcessWithDetailDto[] = [];
  anticipatedMaterials: SaveHospitalResponseProcessWithDetailDto[] = [];
  totalRecords: number;
  isAllowedToManage: boolean = false;
  process: SaveHospitalResponseProcessWithDetailDto;
  processDialog: boolean = false;
  processList: ProcessDto[] = [];
  sutProcessList: ProcessDto[] = [];
  materialProcessList: ProcessDto[] = [];
  material: SaveHospitalResponseProcessWithDetailDto;
  materialDialog: boolean = false;

  constructor(
    injector: Injector,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private hostipalResponseTypeService: HospitalResponseTypeService,
    private hospitalizationTypeService: HospitalizationTypeService,
    private treatmentTypeService: TreatmentTypeService,
    private commonService: CommonService,
    private processService: ProcessService,
    private operationService: OperationService
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.dialogConfig.data?.ptpId && this.dialogConfig.data?.patient) {
      this.loading = true;
      this.fetchData().subscribe({
        next: () => {
          this.isManual = true;
          this.hospitalResponse = {} as SaveHospitalResponseDto;
          this.operation = {} as SaveOperationDto;
          this.patientTreatmentProcessId = this.dialogConfig.data?.ptpId;
          this.patient = this.dialogConfig.data?.patient;
          this.operation.patientTreatmentProcessId = this.patientTreatmentProcessId;
          this.hospitalResponse.hospitalConsultationId = null;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
    else if (this.dialogConfig.data?.operation && this.dialogConfig.data?.hospitalResponse) {
      this.loading = true;
      this.fetchData().subscribe({
        next: () => {
          this.isManual = false;
          this.operationId = +(this.dialogConfig.data?.operation as OperationDto).id;
          this.operation = this.dialogConfig.data?.operation as SaveOperationDto;
          if (this.operation.travelDateToTurkey) {
            this.operation.travelDateToTurkey = new Date(this.operation.travelDateToTurkey);
          }
          if (this.operation.treatmentDate) {
            this.operation.treatmentDate = new Date(this.operation.treatmentDate);
          }
          this.hospitalResponse = this.dialogConfig.data?.hospitalResponse as SaveHospitalResponseDto;
          this.hospitalResponse.possibleTreatmentDate = new Date(this.hospitalResponse.possibleTreatmentDate);
          this.selectedBranches = this.hospitalResponse.hospitalResponseBranches.map(b => b.branchId);
          this.hospitalResponse.hospitalResponseProcesses.forEach(process => {
            let processWithDetail = process as SaveHospitalResponseProcessWithDetailDto;
            processWithDetail.process = this.processList.find(p => p.id == process.processId);
            if (processWithDetail.process.processTypeId == this.processTypeEnum.SutCode) {
              this.anticipatedProcesses.push(processWithDetail);
            }
            else if (processWithDetail.process.processTypeId == this.processTypeEnum.Material) {
              this.anticipatedMaterials.push(processWithDetail);
            }
          });
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  fetchData(): Observable<any> {
    this.branchList = this.commonService.branchList;
    this.hospitalList = this.commonService.hospitalList;
    return forkJoin([
      this.hostipalResponseTypeService.getList(),
      this.hospitalizationTypeService.getList(),
      this.treatmentTypeService.getList(),
      this.processService.getList()
    ]).pipe(
      map(([
        resHospitalResponseTypeList,
        resHospitalizationTypeList,
        resTreatmentTypeList,
        resProcessList
      ]) => {
        this.hospitalResponseTypeList = resHospitalResponseTypeList.items;
        this.hospitalizationTypeList = resHospitalizationTypeList.items;
        this.treatmentTypeList = resTreatmentTypeList.items;
        this.processList = resProcessList.items;
        this.sutProcessList = [...this.processList.filter(p => p.processTypeId == this.processTypeEnum.SutCode)];
        this.materialProcessList = [...this.processList.filter(p => p.processTypeId == this.processTypeEnum.Material)];
      })
    );
  }

  openNewMaterial() {
    this.material = new SaveHospitalResponseProcessWithDetailDto();
    this.materialDialog = true;
  }

  saveMaterial() {
    this.material.processId = this.material.process.id;
    this.anticipatedMaterials.push(this.material);
    this.material = null;
    this.materialDialog = false;
  }

  deleteMaterial(material: SaveHospitalResponseProcessWithDetailDto) {
    this.anticipatedMaterials = this.anticipatedMaterials.filter(m => !(m.processId == material.processId && m.amount == material.amount));
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
    this.anticipatedProcesses = this.anticipatedProcesses.filter(m => !(m.processId == process.processId && m.amount == process.amount));
  }

  hideProcessDialog() {
    this.process = null;
    this.processDialog = false;
  }

  onResponseSave() {
    this.confirm({
      key: 'operationConfirm',
      message: this.l('::HospitalResponse:Message:SaveConfirm'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.isManual) {
          this.hospitalResponse.hospitalResponseBranches = [];
          this.selectedBranches.forEach(branch => {
            this.hospitalResponse.hospitalResponseBranches.push({
              hospitalResponseId: 0,
              branchId: branch
            });
          });
          this.hospitalResponse.hospitalResponseProcesses = [];
          this.hospitalResponse.hospitalResponseProcesses.push(...this.anticipatedProcesses);
          this.hospitalResponse.hospitalResponseProcesses.push(...this.anticipatedMaterials);
          this.operation.hospitalResponse = this.hospitalResponse;
          this.operationService.create(this.operation).subscribe({
            complete: () => {
              this.success(this.l('::Message:SuccessfulSave', this.l('::OperationalInfo:Title')));
              this.dialogRef.close();
            }
          });
        }
        else {
          debugger;
          this.operationService.update(this.operationId, this.operation).subscribe({
            complete: () => {
              this.success(this.l('::Message:SuccessfulSave', this.l('::OperationalInfo:Title')));
              this.dialogRef.close();
            }
          });
        }
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
