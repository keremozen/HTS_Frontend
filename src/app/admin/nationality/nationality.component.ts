import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Nationality, INationality } from 'src/app/models/nationality.model';
import { NationalityService } from 'src/app/services/nationality.service';


@Component({
    selector: 'app-nationality',
    templateUrl: './nationality.component.html',
    styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent {

    nationalityDialog: boolean;
    nationalityList: INationality[];
    nationality: Nationality;
    submitted: boolean;

    constructor(
        private nationalityService: NationalityService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private l: LocalizationService
    ) { }

    ngOnInit() {
        this.nationalityService.getNationalityList().subscribe(data => this.nationalityList = data);
    }

    openNewNationality() {
        this.nationality = new Nationality();
        this.submitted = false;
        this.nationalityDialog = true;
    }


    editNationality(nationality: Nationality) {
        this.nationality = { ...nationality };
        this.nationalityDialog = true;
    }

    deleteNationality(nationality: Nationality) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + nationality.Name + '?',
            header: this.l.instant('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.nationalityList = this.nationalityList.filter(val => val.Id !== nationality.Id);
                this.nationality = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Nationality Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.nationalityDialog = false;
        this.submitted = false;
    }

    saveNationality() {
        this.submitted = true;
    }


}
