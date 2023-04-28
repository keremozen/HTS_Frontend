import { Component, Injector } from '@angular/core';
import { ProcessDto, SaveProcessDto } from '@proxy/dto/process';
import { ProcessTypeDto } from '@proxy/dto/process-type';
import { ProcessService } from '@proxy/service/process.service';
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
    process: SaveProcessDto;
    isEdit: boolean;
    processToBeEdited: ProcessDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private processService: ProcessService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.processService.getList().subscribe({
          next: data => {
            this.processList = data.items;
            this.totalRecords = data.totalCount;
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
    }

    openNewProcess() {
        this.isEdit = false;
        this.process = {} as SaveProcessDto;
        this.process.isActive = true;
        this.processDialog = true;
    }


    editProcess(process: ProcessDto) {
        this.isEdit = true;
        this.processToBeEdited = process;
        this.process = { ...process as SaveProcessDto };
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

}
