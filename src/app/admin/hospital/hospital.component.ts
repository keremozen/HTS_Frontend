import { LocalizationService } from '@abp/ng.core';
import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Hospital, IHospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-hospital',
    templateUrl: './hospital.component.html',
    styleUrls: ['./hospital.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class HospitalComponent extends AppComponentBase {

    hospitalDialog: boolean;
    hospitalList: IHospital[];
    hospital: Hospital;
    submitted: boolean;

    constructor(
        injector: Injector,
        private hospitalService: HospitalService,
        private messageService: MessageService
    ) { 
        super(injector);
    }

    ngOnInit() {
        this.hospitalService.getHospitalList().subscribe(data => this.hospitalList = data);
    }

    openNewHospital() {
        this.hospital = new Hospital();
        this.submitted = false;
        this.hospitalDialog = true;
    }


    editHospital(hospital: Hospital) {
        this.hospital = { ...hospital };
        this.hospitalDialog = true;
    }

    deleteHospital(hospital: Hospital) {
        this.confirm({
            message: 'Are you sure you want to delete ' + hospital.Name + '?',
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hospitalList = this.hospitalList.filter(val => val.Id !== hospital.Id);
                this.hospital = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Hospital Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.hospitalDialog = false;
        this.submitted = false;
    }

    saveHospital() {
        this.submitted = true;
    }

    /*saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }*/

}
