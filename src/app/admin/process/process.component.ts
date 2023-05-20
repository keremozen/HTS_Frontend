import { Component, Injector } from '@angular/core';
import { ProcessDto, SaveProcessDto } from '@proxy/dto/process';
import { ProcessCostDto, SaveProcessCostDto } from '@proxy/dto/process-cost';
import { ProcessRelationDto, SaveProcessRelationDto } from '@proxy/dto/process-relation';
import { ProcessTypeDto } from '@proxy/dto/process-type';
import { ProcessTypeService } from '@proxy/service';
import { ProcessService } from '@proxy/service/process.service';
import { forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


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
    processList: ProcessDto[];
    processTypeList: ProcessTypeDto[] = [];
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

    constructor(
        injector: Injector,
        private processService: ProcessService,
        private processTypeListService: ProcessTypeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;

        forkJoin([
            this.processService.getList(),
            this.processTypeListService.getList()
        ]).subscribe(
            {
                next: ([
                    resProcessList,
                    resProcessTypeList
                ]) => {
                    this.processList = resProcessList.items;
                    this.processList.forEach(process => {
                        process.processCosts.forEach(cost => {
                            cost.validityStartDate = new Date(cost.validityStartDate);
                            cost.validityEndDate = new Date(cost.validityEndDate);
                        })
                    });
                    this.processTypeList = resProcessTypeList.items;
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
            this.processListForRelated = this.processList.filter(p => p.id != this.processToBeEdited.id && !this.processRelationList.some(pr=> pr.childProcessId == p.id));
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
                debugger;
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


}
