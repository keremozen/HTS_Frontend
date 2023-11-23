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
import { EntityEnum_HospitalAgentNoteStatusEnum, EntityEnum_HospitalResponseTypeEnum, EntityEnum_OperationStatusEnum, EntityEnum_ProcessTypeEnum } from '@proxy/enum';
import { HospitalResponseTypeService, HospitalizationTypeService, OperationService, ProcessService, TreatmentTypeService, UserService } from '@proxy/service';
import { Observable, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonService } from 'src/app/services/common.service';
import { HospitalDto } from '@proxy/dto/hospital';
import { OperationDto, SaveOperationDto } from '@proxy/dto/operation';
import { TreatmentTypeDto } from '@proxy/dto/treatment-type';
import { IdentityUserDto } from '@abp/ng.identity/proxy';
import * as moment from 'moment';
import { HospitalAgentNoteDto, SaveHospitalAgentNoteDto } from '@proxy/dto/hospital-agent-note';

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
  isInNewRecordStatus: boolean = false;
  agentNotes: SaveHospitalAgentNoteDto[] = [];
  public hospitalResponseTypeEnum = EntityEnum_HospitalResponseTypeEnum;
  public processTypeEnum = EntityEnum_ProcessTypeEnum;
  public operationStatusEnum = EntityEnum_OperationStatusEnum;

  consultationId: number;
  consultation: HospitalConsultationDto;
  documents: HospitalConsultationDocumentDto[] = [];
  anticipatedProcesses: SaveHospitalResponseProcessWithDetailDto[] = [];
  totalAnticipatedProcesses: number = 0;
  anticipatedMaterials: SaveHospitalResponseProcessWithDetailDto[] = [];
  totalAnticipatedMaterials: number = 0;
  totalRecords: number;
  process: SaveHospitalResponseProcessWithDetailDto;
  processDialog: boolean = false;
  filteredProcesses: ProcessDto[] = [];
  filteredMaterials: ProcessDto[] = [];
  material: SaveHospitalResponseProcessWithDetailDto;
  materialDialog: boolean = false;

  interpreterList: IdentityUserDto[] = [];
  selectedInterpreter: IdentityUserDto;

  constructor(
    injector: Injector,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private hostipalResponseTypeService: HospitalResponseTypeService,
    private hospitalizationTypeService: HospitalizationTypeService,
    private treatmentTypeService: TreatmentTypeService,
    private commonService: CommonService,
    private processService: ProcessService,
    private operationService: OperationService,
    private userService: UserService
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.dialogConfig.data?.ptpId && this.dialogConfig.data?.patient) {
      this.loading = true;
      this.fetchData().subscribe({
        next: () => {
          this.isInNewRecordStatus = true;
          this.isManual = true;
          this.hospitalResponse = {} as SaveHospitalResponseDto;
          this.operation = {} as SaveOperationDto;
          this.patientTreatmentProcessId = this.dialogConfig.data?.ptpId;
          this.patient = this.dialogConfig.data?.patient;
          this.operation.patientTreatmentProcessId = this.patientTreatmentProcessId;
          this.hospitalResponse.hospitalConsultationId = null;
          this.hospitalResponse.possibleTreatmentDate = null;
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
          this.isInNewRecordStatus = (this.dialogConfig.data?.operation as OperationDto).operationStatusId == this.operationStatusEnum.NewRecord;
          this.operationId = +(this.dialogConfig.data?.operation as OperationDto).id;
          this.operation = this.dialogConfig.data?.operation as SaveOperationDto;
          if (this.operation.travelDateToTurkey) {
            this.operation.travelDateToTurkey = new Date(this.operation.travelDateToTurkey);
          }
          if (this.operation.treatmentDate) {
            this.operation.treatmentDate = new Date(this.operation.treatmentDate);
          }
          if (this.operation.appointedInterpreterId) {
            this.selectedInterpreter = (this.dialogConfig.data?.operation as OperationDto).appointedInterpreter;
          }
          this.hospitalResponse = this.dialogConfig.data?.hospitalResponse as SaveHospitalResponseDto;
          if (this.hospitalResponse.possibleTreatmentDate) {
            this.hospitalResponse.possibleTreatmentDate = new Date(this.hospitalResponse.possibleTreatmentDate);
          }
          this.selectedBranches = this.hospitalResponse.hospitalResponseBranches.map(b => b.branchId);
          this.hospitalResponse.hospitalResponseProcesses.forEach(process => {
            let processWithDetail = process as SaveHospitalResponseProcessWithDetailDto;
            this.processService.get(process.processId).subscribe(res=> {
              processWithDetail.process = res;
              if (processWithDetail.process.processTypeId == this.processTypeEnum.SutCode) {
                this.totalAnticipatedProcesses = this.anticipatedProcesses.push(processWithDetail);
              }
              else if (processWithDetail.process.processTypeId == this.processTypeEnum.Material) {
                this.totalAnticipatedMaterials = this.anticipatedMaterials.push(processWithDetail);
              }
            });
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
      this.userService.getInterpreterList()
    ]).pipe(
      map(([
        resHospitalResponseTypeList,
        resHospitalizationTypeList,
        resTreatmentTypeList,
        resInterpreterList
      ]) => {
        this.hospitalResponseTypeList = resHospitalResponseTypeList.items;
        this.hospitalizationTypeList = resHospitalizationTypeList.items;
        this.treatmentTypeList = resTreatmentTypeList.items;
        this.interpreterList = resInterpreterList;
      })
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

  openNewMaterial() {
    this.material = new SaveHospitalResponseProcessWithDetailDto();
    this.materialDialog = true;
  }

  saveMaterial() {
    this.material.processId = this.material.process.id;
    this.totalAnticipatedMaterials =this.anticipatedMaterials.push(this.material);
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

  onNoteAdded(notes: HospitalAgentNoteDto[]) {
    this.agentNotes = notes as SaveHospitalAgentNoteDto[];
    this.agentNotes.forEach(note => {
      note.statusId = EntityEnum_HospitalAgentNoteStatusEnum.NewRecord;
    });
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
          if (this.selectedInterpreter) {
            this.operation.appointedInterpreterId = this.selectedInterpreter.id;
          }
          this.hospitalResponse.hospitalResponseProcesses = [];
          this.hospitalResponse.hospitalAgentNotes = [];
          this.hospitalResponse.hospitalResponseProcesses.push(...this.anticipatedProcesses);
          this.hospitalResponse.hospitalResponseProcesses.push(...this.anticipatedMaterials);
          this.hospitalResponse.hospitalAgentNotes.push(...this.agentNotes);
          this.operation.hospitalResponse = this.hospitalResponse;
          this.operationService.create(this.operation).subscribe({
            complete: () => {
              this.success(this.l('::Message:SuccessfulSave', this.l('::OperationalInfo:Title')));
              this.dialogRef.close();
            }
          });
        }
        else {

          //Yeni kayıt güncelleniyor
          if (this.isInNewRecordStatus) {
            this.hospitalResponse.hospitalResponseBranches = [];
            this.selectedBranches.forEach(branch => {
              this.hospitalResponse.hospitalResponseBranches.push({
                hospitalResponseId: 0,
                branchId: branch
              });
            });
            if (this.selectedInterpreter) {
              this.operation.appointedInterpreterId = this.selectedInterpreter.id;
            }
            this.hospitalResponse.hospitalResponseProcesses = [];
            this.hospitalResponse.hospitalResponseProcesses.push(...this.anticipatedProcesses);
            this.hospitalResponse.hospitalResponseProcesses.push(...this.anticipatedMaterials);
            this.operation.hospitalResponse = this.hospitalResponse;
          }

          if (this.selectedInterpreter) {
            this.operation.appointedInterpreterId = this.selectedInterpreter.id;
          }
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
