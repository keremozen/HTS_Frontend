import { LocalizationService } from '@abp/ng.core';
import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Nationality, INationality } from 'src/app/models/nationality.model';
import { NationalityService } from 'src/app/services/nationality.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-nationality',
    templateUrl: './nationality.component.html',
    styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent extends AppComponentBase {

    nationalityDialog: boolean;
    nationalityList: INationality[];
    nationality: Nationality;
    submitted: boolean;

    constructor(
        injector: Injector,
        private nationalityService: NationalityService,
        private messageService: MessageService
    ) {
        super(injector);
    }

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
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', nationality.Name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.nationalityList = this.nationalityList.filter(val => val.Id !== nationality.Id);
                this.nationality = null;
                this.messageService.add({ severity: 'success', summary: this.l('::Message:Successful'), detail: this.l('::Message:SuccessfulDeletion', this.l('::Admin:Nationality:Name')), life: 3000 });
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
