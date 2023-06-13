import { Component, Injector } from '@angular/core';
import { ProcessTypeDto } from '@proxy/dto/process-type';
import { ProcessTypeService } from '@proxy/service';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-process-type',
    templateUrl: './process-type.component.html',
    styleUrls: ['./process-type.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class ProcessTypeComponent extends AppComponentBase {

    processTypeList: ProcessTypeDto[];
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private processTypeService: ProcessTypeService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.processTypeService.getList().subscribe({
            next: data => {
                this.processTypeList = data.items;
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


}
