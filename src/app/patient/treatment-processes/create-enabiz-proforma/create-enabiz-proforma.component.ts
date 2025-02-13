import { ABP } from '@abp/ng.core';
import { Component, Injector, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { AdditionalServiceDto } from '@proxy/dto/additional-service';
import { CurrencyDto } from '@proxy/dto/currency';
import { ListENabizProcessDto } from '@proxy/dto/external';
import { ProcessDto } from '@proxy/dto/process';
import { SaveENabizProformaDto } from '@proxy/dto/proforma';
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
  selector: 'app-create-enabiz-proforma',
  templateUrl: './create-enabiz-proforma.component.html',
  styleUrls: ['./create-enabiz-proforma.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
  ]
})
export class CreateENabizProformaComponent extends AppComponentBase {

  saveProforma: SaveENabizProformaDto;
  currencyList: CurrencyDto[] = [];
  currencyName: string = "TRY";
  exchangeRateDate: Date;
  enabizProcesses: ListENabizProcessDto[] = [];
  ptpId: number;

  proformaDate = moment();
  saveAdditionalServiceList: SaveProformaAdditionalServiceDtoWithName[] = [];
  selectedAdditionalServices: number[] = [];
  loading: boolean = false;
  treatmentItemList: SaveProformaProcessDtoWithDetails[] = [];
  treatmentItem: SaveProformaProcessDtoWithDetails;
  anticipatedMaterialList: AnticipatedMaterial[] = [];
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
    this.enabizProcesses = this.dialogConfig.data?.enabizProcesses as ListENabizProcessDto[];
    this.ptpId = this.dialogConfig.data?.ptpId;
    this.saveProforma = {} as SaveENabizProformaDto;
    this.saveProforma.description = this.l("::Proforma:DefaultDescriptionText");
    this.saveProforma.operationId = null;
    this.fetchData();
  }

  fetchData() {
    this.selectedAdditionalServices = [];
    this.saveAdditionalServiceList = [];
    this.currencyList = this.commonService.currencyList;
    this.roomTypeList = entityEnum_RoomTypeEnumOptions;

    forkJoin([
      this.additionalServiceService.getList(),
      this.processService.getList()
    ]).subscribe((
      [
        resAdditionalServiceList,
        resProcessList
      ]
    ) => {

      this.saveProforma.ptpId = this.ptpId;
      this.saveProforma.currencyId = this.currencyList.find(c => c.isDefault).id;
      this.onCurrencyChange();
      this.selectedAdditionalServices.push(this.additionalServiceEnum.TransferService, this.additionalServiceEnum.MedicalSecondExamination, this.additionalServiceEnum.Interpreting, this.additionalServiceEnum.CoordinationService);

      resAdditionalServiceList.items.forEach(service => {
        let saveService = {} as SaveProformaAdditionalServiceDtoWithName;
        saveService.additionalServiceId = service.id;
        saveService.additionalService = service;
        this.saveAdditionalServiceList.push(saveService);
      });

      this.treatmentItemList = [];
      this.anticipatedMaterialList = [];

      this.enabizProcesses.forEach(enabizProcess => {
        if (!enabizProcess.isUsedInProforma) {
          var process = resProcessList.items.find(p => p.id == enabizProcess.processId &&
            p.processCosts.some(c => this.proformaDate.isSameOrAfter(c.validityStartDate, 'day') &&
              this.proformaDate.isSameOrBefore(c.validityEndDate, 'day')));
          if (process) {
            if (process.processTypeId == this.processTypeEnum.SutCode) {
              var existingTreatmentItem = this.treatmentItemList.find(ti => ti.processId == process.id);
              if (!existingTreatmentItem) {
                let item = new SaveProformaProcessDtoWithDetails();
                item.processId = process.id;
                item.code = process.code;
                item.name = process.name;
                item.treatmentCount = +enabizProcess.adet;
                item.unitPrice = process.processCosts.filter(c => this.proformaDate.isSameOrAfter(c.validityStartDate, 'day') && this.proformaDate.isSameOrBefore(c.validityEndDate, 'day'))
                  .reduce((sum, current) => sum + current.ushasPrice, 0);
                item.totalPrice = +(item.treatmentCount * item.unitPrice).toFixed(2);
                item.proformaPrice = +(item.totalPrice / this.saveProforma.exchangeRate).toFixed(2);
                item.change = 0;
                item.proformaFinalPrice = item.proformaPrice;
                this.treatmentItemList.push(item);
              } else {
                existingTreatmentItem.treatmentCount += +enabizProcess.adet;
                existingTreatmentItem.totalPrice = +(existingTreatmentItem.treatmentCount * existingTreatmentItem.unitPrice).toFixed(2);
                existingTreatmentItem.proformaPrice = +(existingTreatmentItem.totalPrice / this.saveProforma.exchangeRate).toFixed(2);
                existingTreatmentItem.proformaFinalPrice = existingTreatmentItem.proformaPrice;
              }
            }
            else if (process.processTypeId == this.processTypeEnum.Material) {
              let item = new AnticipatedMaterial();
              item.processId = process.id;
              item.name = process.name;
              item.amount = +this.enabizProcesses.find(ep => ep.processId == process.id).adet;
              item.unitCost = process.processCosts.filter(c => this.proformaDate.isSameOrAfter(c.validityStartDate, 'day') && this.proformaDate.isSameOrBefore(c.validityEndDate, 'day'))
                .reduce((sum, current) => sum + current.ushasPrice, 0);
              item.totalCost = +(item.amount * item.unitCost).toFixed(2);
              item.proformaCost = +(item.totalCost / this.saveProforma.exchangeRate).toFixed(2);
              this.anticipatedMaterialList.push(item);
            }
          }
        }
      });

      this.saveProforma.totalProformaPrice = +(this.treatmentItemList.reduce((sum, current) => sum + current.proformaFinalPrice, 0)).toFixed(2);
    });
  }

  filterProcess(event: any) {
    let query = event.query;
    this.processService.getListByKeyword(query, EntityEnum_ProcessTypeEnum.SutCode).subscribe({
      next: (res) => {
        this.filteredProcesses = res.items;
      }
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

  private updateTotals() {
    this.saveProforma.totalProformaPrice = +(this.treatmentItemList.reduce((sum, current) => sum + current.proformaFinalPrice, 0)).toFixed(2);
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
  }

  onChangeAmountChange(event, item: SaveProformaProcessDtoWithDetails) {
    item.proformaFinalPrice = +(((item.change + 100) * item.proformaPrice) / 100).toFixed(2);
    this.saveProforma.totalProformaPrice = +(this.treatmentItemList.reduce((sum, current) => sum + current.proformaFinalPrice, 0)).toFixed(2);
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
    this.treatmentItem.totalPrice = +(this.treatmentItem.treatmentCount * this.treatmentItem.unitPrice).toFixed(2);
    this.treatmentItem.proformaPrice = +(this.treatmentItem.totalPrice / this.saveProforma.exchangeRate).toFixed(2);
    this.treatmentItem.proformaFinalPrice = this.treatmentItem.proformaPrice;
    this.treatmentItemList.push(this.treatmentItem);
    this.updateTotals();
    this.hideTreatmentItemDialog();
  }

  removeItem(item: SaveProformaProcessDtoWithDetails) {
    this.treatmentItemList = this.treatmentItemList.filter(i => i.processId != item.processId);
    this.updateTotals();
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
    this.proformaService.saveENabiz(this.saveProforma).subscribe({
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
