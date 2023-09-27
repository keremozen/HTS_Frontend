import { ABP } from '@abp/ng.core';
import { Component, Injector, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { AdditionalServiceDto } from '@proxy/dto/additional-service';
import { BranchDto } from '@proxy/dto/branch';
import { CurrencyDto } from '@proxy/dto/currency';
import { HospitalResponseDto } from '@proxy/dto/hospital-response';
import { HospitalResponseProcessDto } from '@proxy/dto/hospital-response-process';
import { OperationDto } from '@proxy/dto/operation';
import { ProcessDto } from '@proxy/dto/process';
import { ProformaDto, ProformaListDto, SaveProformaDto } from '@proxy/dto/proforma';
import { SaveProformaAdditionalServiceDto } from '@proxy/dto/proforma-additional-service';
import { SaveProformaNotIncludingServiceDto } from '@proxy/dto/proforma-not-including-service';
import { SaveProformaProcessDto } from '@proxy/dto/proforma-process';
import { EntityEnum_AdditionalServiceEnum, EntityEnum_OperationStatusEnum, EntityEnum_ProcessTypeEnum, EntityEnum_ProformaStatusEnum, EntityEnum_RoomTypeEnum, entityEnum_RoomTypeEnumOptions } from '@proxy/enum';
import { AdditionalServiceService, ExchangeRateInformationService, HospitalResponseService, ProcessService, ProformaService } from '@proxy/service';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
  ]
})
export class ProformaComponent extends AppComponentBase {

  operation: OperationDto;
  hospitalResponse: HospitalResponseDto;
  saveProforma: SaveProformaDto;
  currencyList: CurrencyDto[] = [];
  currencyName: string = "TRY";
  proformaList: ProformaListDto[] = [];
  selectedProformaId: number;
  selectedProforma: ProformaDto;
  isEdit: boolean = false;
  isDisabled: boolean = false;
  exchangeRateDate: Date;

  hospitalName: string;
  proformaDate = moment();
  saveAdditionalServiceList: SaveProformaAdditionalServiceDtoWithName[] = [];
  selectedAdditionalServices: number[] = [];
  processes: HospitalResponseProcessDto[] = [];
  materials: HospitalResponseProcessDto[] = [];
  loading: boolean = false;
  treatmentItemList: SaveProformaProcessDtoWithDetails[] = [];
  treatmentItem: SaveProformaProcessDtoWithDetails;
  anticipatedMaterialList: AnticipatedMaterial[] = [];
  branchList: BranchDto[] = [];
  branchListText: string;
  showTreatmentItemDialog: boolean;
  selectedProcess: ProcessDto;
  roomTypeList: ABP.Option<typeof EntityEnum_RoomTypeEnum>[] = [];
  filteredProcesses: ProcessDto[] = [];

  public processTypeEnum = EntityEnum_ProcessTypeEnum;
  public additionalServiceEnum = EntityEnum_AdditionalServiceEnum;
  public roomTypeEnum = EntityEnum_RoomTypeEnum;
  public proformaStatusEnum = EntityEnum_ProformaStatusEnum;
  public operationStatusEnum = EntityEnum_OperationStatusEnum;

  proformaNotIncludingServiceList: SaveProformaNotIncludingServiceDtoWithRowNumber[] = [];
  notIncludingServiceRowNumber: number = 1;
  showNotIncludingItemsDialog: boolean = false;
  proformaNotIncludingService: SaveProformaNotIncludingServiceDtoWithRowNumber;

  isAllowedToManageProforma: boolean = false;
  isAllowedToMFBApprove: boolean = false;

  constructor(
    injector: Injector,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private commonService: CommonService,
    private additionalServiceService: AdditionalServiceService,
    private hospitalResponseService: HospitalResponseService,
    private processService: ProcessService,
    private proformaService: ProformaService,
    private exchangeRateInfoService: ExchangeRateInformationService
  ) {
    super(injector);
    this.isAllowedToManageProforma = this.permission.getGrantedPolicy("HTS.ProformaManagement");
    this.isAllowedToMFBApprove = this.permission.getGrantedPolicy("HTS.MFBApproval");
  }

  ngOnInit() {
    this.operation = this.dialogConfig.data?.operation;
    this.isDisabled = this.dialogConfig.data?.isDisabled || (this.operation.operationStatusId == this.operationStatusEnum.ProformaCreatedWaitingForMFBApproval && !this.isAllowedToMFBApprove);
    this.proformaService.getNameListByOperationId(+this.operation.id).subscribe({
      next: (res) => {
        this.proformaList = res;
      },
      complete: () => {
        if (this.proformaList.length > 0) {
          this.selectedProformaId = this.proformaList[0].id;
          this.getProforma();
        }
        else {
          this.isEdit = false;
          this.saveProforma = {} as SaveProformaDto;
          this.saveProforma.description = this.l("::Proforma:DefaultDescriptionText");
          this.saveProforma.operationId = +this.operation.id;
          this.fetchData();
        }

      }
    });
  }

  private getProforma() {
    this.proformaService.getById(this.selectedProformaId).subscribe({
      next: (res) => {
        this.isEdit = true;
        this.selectedProforma = res;
        this.saveProforma = {} as SaveProformaDto;
        this.saveProforma.description = this.l("::Proforma:DefaultDescriptionText");
        this.saveProforma.currencyId = this.selectedProforma.currencyId;
        this.saveProforma.description = this.selectedProforma.description;
        this.saveProforma.exchangeRate = this.selectedProforma.exchangeRate;
        this.saveProforma.operationId = this.selectedProforma.operationId;
        this.saveProforma.proformaCode = this.selectedProforma.proformaCode;
        this.saveProforma.proformaStatusId = this.selectedProforma.proformaStatusId;
        this.saveProforma.totalProformaPrice = this.selectedProforma.totalProformaPrice;
        this.saveProforma.tpDescription = this.selectedProforma.tpDescription;
        this.saveProforma.version = this.selectedProforma.version;
        this.saveProforma.proformaNotIncludingServices = this.selectedProforma.proformaNotIncludingServices as SaveProformaNotIncludingServiceDto[];
        this.saveProforma.proformaAdditionalServices = this.selectedProforma.proformaAdditionalServices as SaveProformaAdditionalServiceDto[];
        this.saveProforma.proformaProcesses = this.selectedProforma.proformaProcesses as SaveProformaProcessDto[];
      },
      complete: () => {
        this.fetchData();
        //this.onCurrencyChange();
      }
    });
  }

  fetchData() {
    this.selectedAdditionalServices = [];
    this.saveAdditionalServiceList = [];
    this.currencyList = this.commonService.currencyList;
    this.branchList = this.commonService.branchList;
    this.roomTypeList = entityEnum_RoomTypeEnumOptions;

    forkJoin([
      this.additionalServiceService.getList(),
      this.hospitalResponseService.get(this.operation.hospitalResponseId)
    ]).subscribe((
      [
        resAdditionalServiceList,
        resHospitalResponse
      ]
    ) => {
      if (!this.isEdit) {
        this.saveProforma.currencyId = this.currencyList.find(c => c.isDefault).id;
        this.onCurrencyChange();
        this.selectedAdditionalServices.push(this.additionalServiceEnum.TransferService, this.additionalServiceEnum.MedicalSecondExamination, this.additionalServiceEnum.Interpreting, this.additionalServiceEnum.CoordinationService);
      }
      else {
        this.selectedAdditionalServices.push(...this.saveProforma.proformaAdditionalServices.map(pas => pas.additionalServiceId));
      }

      resAdditionalServiceList.items.forEach(service => {
        let saveService = {} as SaveProformaAdditionalServiceDtoWithName;
        saveService.additionalServiceId = service.id;
        saveService.additionalService = service;
        this.saveAdditionalServiceList.push(saveService);
      });

      this.hospitalResponse = resHospitalResponse;
      if (this.operation.hospital) {
        this.hospitalName = this.operation.hospital.name;
      }
      else if (this.hospitalResponse.hospitalConsultation?.hospital) {
        this.hospitalName = this.hospitalResponse.hospitalConsultation?.hospital.name;
      }

      this.branchListText = this.branchList.filter(b => this.hospitalResponse.hospitalResponseBranches.map(rb => rb.branchId).includes(b.id)).map(b => b.name).join(", ");
      this.processes = this.hospitalResponse.hospitalResponseProcesses.filter(p => p.process.processTypeId == this.processTypeEnum.SutCode &&
        p.process.processCosts.some(c => this.proformaDate.isSameOrAfter(c.validityStartDate, 'day') &&
          this.proformaDate.isSameOrBefore(c.validityEndDate, 'day')));
      this.materials = this.hospitalResponse.hospitalResponseProcesses.filter(p => p.process.processTypeId == this.processTypeEnum.Material &&
        p.process.processCosts.some(c => this.proformaDate.isSameOrAfter(c.validityStartDate, 'day') &&
          this.proformaDate.isSameOrBefore(c.validityEndDate, 'day')));

      if (!this.isEdit) {
        this.generateItems();
      }
      else {
        this.treatmentItemList = this.saveProforma.proformaProcesses as SaveProformaProcessDtoWithDetails[];

        this.treatmentItemList.forEach(treatmentItem => {
          this.processService.get(treatmentItem.processId).subscribe(res => {
            treatmentItem.code = res.code;
            treatmentItem.name = res.name;
          });
        });

        this.proformaNotIncludingServiceList = this.saveProforma.proformaNotIncludingServices as SaveProformaNotIncludingServiceDtoWithRowNumber[];
        this.reorderNotIncludingServices();

        this.saveAdditionalServiceList.forEach(addService => {
          const service = this.saveProforma.proformaAdditionalServices.find(s => s.additionalServiceId == addService.additionalServiceId);
          if (service) {
            addService.companionCount = service.companionCount;
            addService.dayCount = service.dayCount;
            addService.itemCount = service.itemCount;
            addService.proformaId = service.proformaId;
            addService.roomTypeId = service.roomTypeId;
          }
        });

        //this.updateItems();
      }
    });
  }

  onProformaChange() {
    this.getProforma();
  }

  filterProcess(event: any) {
    let query = event.query;
    this.processService.getListByKeyword(query, EntityEnum_ProcessTypeEnum.SutCode).subscribe({
      next: (res) => {
        this.filteredProcesses = res.items;
      }
    });
  }

  private generateItems() {
    this.treatmentItemList = [];
    this.anticipatedMaterialList = [];
    this.processes.forEach(process => {
      let item = new SaveProformaProcessDtoWithDetails();
      item.processId = process.process.id;
      item.code = process.process?.code;
      item.name = process.process?.name;
      item.treatmentCount = process.amount;
      item.unitPrice = process.process?.processCosts.filter(c => this.proformaDate.isSameOrAfter(c.validityStartDate, 'day') && this.proformaDate.isSameOrBefore(c.validityEndDate, 'day'))
        .reduce((sum, current) => sum + current.ushasPrice, 0);
      item.totalPrice = +(item.treatmentCount * item.unitPrice).toFixed(2);
      item.proformaPrice = +(item.totalPrice / this.saveProforma.exchangeRate).toFixed(2);
      item.change = 0;
      item.proformaFinalPrice = item.proformaPrice;
      this.treatmentItemList.push(item);
    });
    this.saveProforma.totalProformaPrice = this.treatmentItemList.reduce((sum, current) => sum + current.proformaFinalPrice, 0);

    this.materials.forEach(material => {
      let item = new AnticipatedMaterial();
      item.processId = material.process.id;
      item.name = material.process?.name;
      item.amount = material.amount;
      item.unitCost = material.process?.processCosts.filter(c => this.proformaDate.isSameOrAfter(c.validityStartDate, 'day') && this.proformaDate.isSameOrBefore(c.validityEndDate, 'day'))
        .reduce((sum, current) => sum + current.ushasPrice, 0);
      item.totalCost = +(item.amount * item.unitCost).toFixed(2);
      item.proformaCost = +(item.totalCost / this.saveProforma.exchangeRate).toFixed(2);
      this.anticipatedMaterialList.push(item);
    });
  }

  private updateItems() {
    this.treatmentItemList.forEach(item => {
      item.totalPrice = +(item.treatmentCount * item.unitPrice).toFixed(2);
      item.proformaPrice = +(item.totalPrice / this.saveProforma.exchangeRate).toFixed(2);
      item.proformaFinalPrice = +(((item.change + 100) * item.proformaPrice) / 100).toFixed(2);
    });

    this.saveProforma.totalProformaPrice = +(this.treatmentItemList.reduce((sum, current) => sum + current.proformaFinalPrice, 0)).toFixed(2);

    this.anticipatedMaterialList.forEach(item => {
      item.totalCost = +(item.amount * item.unitCost).toFixed(2);
      item.proformaCost = +(item.totalCost / this.saveProforma.exchangeRate).toFixed(2);
    });
  }

  onCurrencyChange() {
    this.currencyName = this.currencyList.find(c => c.id == this.saveProforma.currencyId).name;
    if (this.currencyName == "TL") {
      this.currencyName = "TRY";
      this.saveProforma.exchangeRate = 1;
      this.updateItems();
    }
    else {
      this.exchangeRateInfoService.get(this.saveProforma.currencyId).subscribe({
        next: (res) => {
          if (res) {
            this.exchangeRateDate = new Date(res.creationTime);
            this.saveProforma.exchangeRate = res.exchangeRate;
            this.updateItems();
          }
          else {
            this.exchangeRateDate = null;
            this.error(this.l("::Proforma:Error:CurrencyNotFound"));
            const tlCurrency = this.currencyList.find(c => c.name == "TL");
            if (tlCurrency) {
              this.saveProforma.currencyId = tlCurrency.id;
              this.currencyName = "TRY";
              this.saveProforma.exchangeRate = 1;
              this.updateItems();
            }
          }
        }
      });
    }
  }

  onTreatmentCountChange(event, item: SaveProformaProcessDtoWithDetails) {
    item.totalPrice = +(item.treatmentCount * item.unitPrice).toFixed(2);
    item.proformaPrice = +(item.totalPrice / this.saveProforma.exchangeRate).toFixed(2);
    item.proformaFinalPrice = +(((item.change + 100) * item.proformaPrice) / 100).toFixed(2);
    this.saveProforma.totalProformaPrice = +(this.treatmentItemList.reduce((sum, current) => sum + current.proformaFinalPrice, 0)).toFixed(2);
    debugger;
  }

  onChangeAmountChange(event, item: SaveProformaProcessDtoWithDetails) {
    item.proformaFinalPrice = +(((item.change + 100) * item.proformaPrice) / 100).toFixed(2);
    this.saveProforma.totalProformaPrice = +(this.treatmentItemList.reduce((sum, current) => sum + current.proformaFinalPrice, 0)).toFixed(2);
    debugger;
  }

  onFinalPriceChange(event, processCode: string) {
    let newValue: number = event.value;
    let item = this.treatmentItemList.find(ti => ti.code == processCode);
    item.change = +((((newValue - item.proformaPrice) * 100) / item.proformaPrice).toFixed(2));
    this.saveProforma.totalProformaPrice = +(this.treatmentItemList.reduce((sum, current) => sum + current.proformaFinalPrice, 0)).toFixed(2);
  }

  onNewTreatmentItem() {
    this.treatmentItem = new SaveProformaProcessDtoWithDetails();
    this.showTreatmentItemDialog = true;
  }

  hideTreatmentItemDialog() {
    this.treatmentItem = null;
    this.selectedProcess = null;
    this.showTreatmentItemDialog = false;
  }

  addTreatmentItem() {
    if (this.treatmentItemList.some(i => i.code == this.selectedProcess.code)) {
      this.error(this.l("::HTS:31"));
      return;
    }
    this.treatmentItem.processId = this.selectedProcess.id;
    this.treatmentItem.code = this.selectedProcess.code;
    this.treatmentItem.name = this.selectedProcess.name;
    this.treatmentItem.unitPrice = this.selectedProcess.processCosts.reduce((sum, current) => sum + current.ushasPrice, 0);
    this.treatmentItem.change = 0;
    this.treatmentItemList.push(this.treatmentItem);
    this.updateItems();
    this.hideTreatmentItemDialog();
  }

  removeItem(item: SaveProformaProcessDtoWithDetails) {
    this.treatmentItemList = this.treatmentItemList.filter(i => i.processId != item.processId);
    this.updateItems();
  }

  onNewNotIncludingService() {
    this.proformaNotIncludingService = {} as SaveProformaNotIncludingServiceDtoWithRowNumber;
    this.proformaNotIncludingService.rowNumber = this.notIncludingServiceRowNumber;
    this.showNotIncludingItemsDialog = true;
  }

  addNotIncludingService() {
    this.proformaNotIncludingServiceList.push(this.proformaNotIncludingService);
    this.notIncludingServiceRowNumber++;
    this.hideNotIncludingItemsDialog();
  }

  removeNotIncludingService(item: SaveProformaNotIncludingServiceDtoWithRowNumber) {
    this.proformaNotIncludingServiceList = this.proformaNotIncludingServiceList.filter(s => s.rowNumber != item.rowNumber);
    this.reorderNotIncludingServices();
    this.hideNotIncludingItemsDialog();
  }

  reorderNotIncludingServices() {
    this.notIncludingServiceRowNumber = 1;
    for (let index = 0; index < this.proformaNotIncludingServiceList.length; index++) {
      var service = this.proformaNotIncludingServiceList[index];
      service.rowNumber = this.notIncludingServiceRowNumber++;
    }
  }

  hideNotIncludingItemsDialog() {
    this.proformaNotIncludingService = null;
    this.showNotIncludingItemsDialog = false;
  }

  onSaveProforma() {
    this.saveProforma.proformaCode = "1";
    this.saveProforma.proformaStatusId = this.proformaStatusEnum.NewRecord;
    this.saveProforma.proformaProcesses = this.treatmentItemList;
    this.saveProforma.proformaAdditionalServices = this.saveAdditionalServiceList.filter(s => this.selectedAdditionalServices.includes(s.additionalService.id));
    this.saveProforma.proformaNotIncludingServices = this.proformaNotIncludingServiceList;

    this.loading = true;
    this.proformaService.save(this.saveProforma).subscribe({
      complete: () => {
        this.loading = false;
        this.success(this.l("::Proforma:SaveSuccessful"));
        this.dialogRef.close();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSendProforma() {
    this.confirm({
      key: 'proformaConfirm',
      message: this.l('::Proforma:Message:SendConfirm'),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.proformaService.send(this.selectedProformaId).subscribe({
          complete: () => {
            this.loading = false;
            this.success(this.l("::Proforma:SendSuccessful"));
            this.dialogRef.close();
          },
          error: () => {
            this.loading = false;
          }
        });
      }
    });
  }

  downloadProforma() {
    if (this.selectedProformaId) {
      this.proformaService.createProformaPdfById(this.selectedProformaId).subscribe({
        next: r => {
          const source = `data:application/pdf;base64,${r}`;
          const link = document.createElement("a");
          link.href = source;
          link.download = `${this.selectedProforma.proformaCode}.pdf`
          link.click();
        }
      });
    }
  }
}

class SaveProformaNotIncludingServiceDtoWithRowNumber implements SaveProformaNotIncludingServiceDto {
  rowNumber: number;
  proformaId: number;
  description: string;
}

class SaveProformaAdditionalServiceDtoWithName implements SaveProformaAdditionalServiceDto {
  proformaId: number;
  dayCount?: number;
  companionCount?: number;
  itemCount?: number;
  additionalServiceId: EntityEnum_AdditionalServiceEnum;
  additionalService: AdditionalServiceDto;
  roomTypeId?: EntityEnum_RoomTypeEnum;
}

class SaveProformaProcessDtoWithDetails implements SaveProformaProcessDto {
  proformaId: number;
  processId: number;
  treatmentCount: number;
  unitPrice: number;
  totalPrice: number;
  proformaPrice: number;
  proformaFinalPrice: number;
  change: number;
  code: string;
  name: string;
}

class AnticipatedMaterial {
  processId: number;
  name: string;
  amount: number;
  unitCost: number;
  totalCost: number;
  proformaCost: number;
}
