import { DatePipe } from '@angular/common';
import { Component, Injector, ViewChild } from '@angular/core';
import { ProcessDto, SaveProcessDto } from '@proxy/dto/process';
import { ProcessCostDto, SaveProcessCostDto } from '@proxy/dto/process-cost';
import { ProcessKindDto } from '@proxy/dto/process-kind';
import { ProcessRelationDto, SaveProcessRelationDto } from '@proxy/dto/process-relation';
import { ProcessTypeDto } from '@proxy/dto/process-type';
import { EntityEnum_ProcessTypeEnum } from '@proxy/enum';
import { ProcessService } from '@proxy/service/process.service';
import { FilterMetadata, FilterService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class ProcessComponent extends AppComponentBase {

    processDialog: boolean;
    processList: ProcessDtoWithDetail[];
    processTypeList: ProcessTypeDto[] = [];
    processKindList: ProcessKindDto[] = [];
    processCostList: SaveProcessCostDto[] = [];
    includedProcessList: ProcessDto[] = [];
    processRelationList: SaveProcessRelationDto[] = [];
    processListForRelated: ProcessDto[] = [];
    selectedProcessForRelation: ProcessDto;
    process: SaveProcessDto;
    isEdit: boolean;
    processToBeEdited: ProcessDto;
    loading: boolean;

    costDialog: boolean = false;
    cost: SaveProcessCostDto;
    isCostEdit: boolean;
    processCostToBeEdited: ProcessCostDto;

    processRelationDialog: boolean = false;
    processRelation: SaveProcessRelationDto;
    processRelationToBeEdited: ProcessRelationDto;

    processTypeSet: SelectItem[];
    processKindSet: SelectItem[];
    @ViewChild('dt') table: Table;

    /* Filter props */
    filterCode: string;
    filterName: string;
    filterEnglishName: string;
    filterUshasPrice: string;
    filterValidityStart: Date;
    filterValidityEnd: Date;
    filterDescription: Date;
    filterProcessType: SelectItem[];
    filterProcessKind: SelectItem[];
    filterActive: SelectItem[];

    constructor(
        injector: Injector,
        private processService: ProcessService,
        private commonService: CommonService,
        private filterService: FilterService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.filterService.register('customDateFilter', (value, filter): boolean => {
            var datePipe = new DatePipe("tr");
            if (filter === undefined || filter === null || filter === '') {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }
            return datePipe.transform(value, 'dd.MM.yyyy') === datePipe.transform(filter, 'dd.MM.yyyy');
        });

        this.fetchData();
    }

    setDropDownFilterOptions() {
        this.processKindSet = [];
        this.processTypeSet = [];
        this.processKindList.forEach(kind => {
            if (!this.processKindSet.some(s => s.value.Id == kind.id)) {
                this.processKindSet.push({ label: kind.name, value: kind.id });
            }
        });
        this.processTypeList.forEach(type => {
            if (!this.processTypeSet.some(s => s.value.Id == type.id)) {
                this.processTypeSet.push({ label: type.name, value: type.id });
            }
        });
    }

    resetTable() {
        this.filterCode = (this.table.filters['code'] != null || this.table.filters['code'] != undefined) ? (this.table.filters['code'] as FilterMetadata).value : null;
        this.filterName = (this.table.filters['name'] != null || this.table.filters['name'] != undefined) ? (this.table.filters['name'] as FilterMetadata).value : null;
        this.filterEnglishName = (this.table.filters['englishName'] != null || this.table.filters['englishName'] != undefined) ? (this.table.filters['englishName'] as FilterMetadata).value : null;
        this.filterUshasPrice = (this.table.filters['ushasPrice'] != null || this.table.filters['ushasPrice'] != undefined) ? (this.table.filters['ushasPrice'] as FilterMetadata).value : null;
        this.filterValidityStart = (this.table.filters['validityStart'] != null || this.table.filters['validityStart'] != undefined) ? new Date((this.table.filters['validityStart'] as FilterMetadata).value) : null;
        this.filterValidityEnd = (this.table.filters['validityEnd'] != null || this.table.filters['validityEnd'] != undefined) ? new Date((this.table.filters['validityEnd'] as FilterMetadata).value) : null;
        this.filterDescription = (this.table.filters['description'] != null || this.table.filters['description'] != undefined) ? (this.table.filters['description'] as FilterMetadata).value : null;
        if (this.table.filters['processType.id'] != null || this.table.filters['processType.id'] != undefined) {
            this.filterProcessType = [];
            ((this.table.filters['processType.id'] as FilterMetadata).value as number[]).forEach(n => {
                let processTypeSelectItem = this.processTypeSet.find(p => p.value === n);
                this.filterProcessType.push(processTypeSelectItem);
            });
        }
        else {
            this.filterProcessType = null;
        }
        if (this.table.filters['processKind.id'] != null || this.table.filters['processKind.id'] != undefined) {
            this.filterProcessKind = [];
            ((this.table.filters['processKind.id'] as FilterMetadata).value as number[]).forEach(n => {
                let processKindSelectItem = this.processKindSet.find(p => p.value === n);
                this.filterProcessKind.push(processKindSelectItem);
            });
        }
        else {
            this.filterProcessKind = null;
        }
    }

    fetchData() {
        this.processTypeList = this.commonService.processTypeList;
        this.processKindList = this.commonService.processKindList;
        this.loading = true;

        forkJoin([
            this.processService.getList()
        ]).subscribe(
            {
                next: ([
                    resProcessList
                ]) => {
                    this.processList = resProcessList.items as ProcessDtoWithDetail[];
                    this.processList.forEach(process => {
                        process.processCosts.forEach(cost => {
                            cost.validityStartDate = new Date(cost.validityStartDate);
                            cost.validityEndDate = new Date(cost.validityEndDate);
                            if (cost.validityStartDate <= new Date() && cost.validityEndDate >= new Date()) {
                                process.ushasPrice = cost.ushasPrice;
                                process.validityStart = cost.validityStartDate;
                                process.validityEnd = cost.validityEndDate;
                            }
                        })
                    });
                },
                error: () => {
                    this.loading = false;
                },
                complete: () => {
                    this.setDropDownFilterOptions();
                    this.resetTable();
                    this.loading = false;
                }
            }
        );
    }

    openNewProcess() {
        this.isEdit = false;
        this.process = {} as SaveProcessDto;
        this.processCostList = [];
        this.processRelationList = [];
        this.process.processCosts = this.processCostList;
        this.process.processRelations = this.processRelationList;
        this.process.processRelations = [];
        this.process.isActive = true;
        this.processDialog = true;
    }

    editProcess(process: ProcessDto) {
        this.isEdit = true;
        this.processToBeEdited = process;
        this.process = { ...process as SaveProcessDto };
        this.processCostList = this.process.processCosts;
        this.processRelationList = this.process.processRelations;
        this.buildProcessRelationTable();
        this.processDialog = true;
    }

    deleteProcess(process: ProcessDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', process.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.processService.delete(process.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:Process:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveProcess() {
        this.process.processCosts = this.processCostList;
        this.process.processRelations = this.processRelationList;
        if (!this.isEdit) {

            this.processService.create(this.process).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Process:Name')));
                }
            });
        }
        else {
            this.processService.update(this.processToBeEdited.id, this.process).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Process:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.process = null;
        this.processToBeEdited = null;
        this.processDialog = false;
    }

    openNewProcessCost() {
        this.isCostEdit = false;
        this.cost = {} as SaveProcessCostDto;
        this.cost.isActive = true;
        this.costDialog = true;
    }

    editProcessCost(cost: ProcessCostDto) {
        this.isCostEdit = true;
        this.processCostToBeEdited = cost;
        this.cost = { ...cost as SaveProcessCostDto };
        this.costDialog = true;
    }

    deleteProcessCost(cost: ProcessCostDto) {
        this.confirm({
            message: this.l('::Message:GenericDeleteConfirmation'),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (cost.id) {
                    this.processCostList = this.processCostList.filter(p => p != cost);
                }
                else {
                    this.processCostList = this.processCostList.filter(p => !(p.hospitalPrice == cost.hospitalPrice && p.ushasPrice == cost.ushasPrice && p.validityEndDate == cost.validityEndDate && p.validityStartDate == cost.validityStartDate));
                }
            }
        });
    }

    saveProcessCost() {
        if (!this.isCostEdit) {
            this.processCostList.push({ ...this.cost });
            this.cost = null;
            this.costDialog = false;
        }
        else {
            var tempCost: ProcessCostDto;
            if (this.processCostToBeEdited.id) {
                tempCost = this.processCostList.find(p => p == this.processCostToBeEdited);
            }
            else {
                tempCost = this.processCostList.find(p => p.hospitalPrice == this.processCostToBeEdited.hospitalPrice && p.ushasPrice == this.processCostToBeEdited.ushasPrice && p.validityEndDate == this.processCostToBeEdited.validityEndDate && p.validityStartDate == this.processCostToBeEdited.validityStartDate);
            }
            tempCost.hospitalPrice = this.cost.hospitalPrice;
            tempCost.ushasPrice = this.cost.ushasPrice;
            tempCost.validityEndDate = this.cost.validityEndDate;
            tempCost.validityStartDate = this.cost.validityStartDate;
            this.cost = null;
            this.costDialog = false;
        }
    }

    hideCostDialog() {
        this.cost = null;
        this.costDialog = false;
    }

    openNewProcessRelation() {
        this.processRelation = {} as SaveProcessRelationDto;
        if (this.isEdit) {
            this.processRelation.processId = this.processToBeEdited.id;
            this.processListForRelated = this.processList.filter(p => p.id != this.processToBeEdited.id && !this.processRelationList.some(pr => pr.childProcessId == p.id));
        }
        else {
            this.processListForRelated = this.processList;
        }

        this.processRelationDialog = true;
    }

    deleteProcessRelation(childProcess: ProcessDto) {
        this.confirm({
            message: this.l('::Message:GenericDeleteConfirmation'),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.processRelationList = this.processRelationList.filter(pr => pr.childProcessId != childProcess.id);
                this.buildProcessRelationTable();
            }
        });
    }

    saveProcessRelation() {
        this.processRelation.childProcessId = this.selectedProcessForRelation.id;
        this.processRelationList.push({ ...this.processRelation });
        this.buildProcessRelationTable();
        this.selectedProcessForRelation = null;
        this.processRelation = null;
        this.processRelationDialog = false;
    }

    hideProcessRelationDialog() {
        this.processRelation = null;
        this.selectedProcessForRelation = null;
        this.processRelationDialog = false;
    }

    private buildProcessRelationTable() {
        this.includedProcessList = [];
        this.processRelationList.forEach(processRelation => {
            this.includedProcessList.push({ ...this.processList.find(p => p.id == processRelation.childProcessId) });
        });
    }

    onValidityStartSelect(value) {
        this.table.filter(new Date(value), 'validityStart', 'customDateFilter')
    }

    onValidityEndSelect(value) {
        this.table.filter(new Date(value), 'validityEnd', 'customDateFilter')
    }

    onProcessTypeSelect(event) {
        this.table.filter(event.value, 'processTypeId', 'in');
    }

    onProcessKindSelect(event) {
        this.table.filter(event.value, 'processKindId', 'in');
    }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.processList);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'islemListesi');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}


class ProcessDtoWithDetail implements ProcessDto {
    name?: string;
    englishName?: string;
    code?: string;
    description?: string;
    processTypeId: EntityEnum_ProcessTypeEnum;
    processKindId?: number;
    isActive: boolean;
    processType: ProcessTypeDto;
    processKind: ProcessKindDto;
    processCosts: ProcessCostDto[];
    processRelations: ProcessRelationDto[];
    id?: number;
    ushasPrice: number;
    validityEnd: Date;
    validityStart: Date;
}
