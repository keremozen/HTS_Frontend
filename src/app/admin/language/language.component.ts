import { LocalizationService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Language, ILanguage } from 'src/app/models/language.model';
import { LanguageService } from 'src/app/services/language.service';


@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class LanguageComponent {

    languageDialog: boolean;
    languageList: ILanguage[];
    language: Language;
    submitted: boolean;

    constructor(
        private languageService: LanguageService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private l: LocalizationService
    ) { }

    ngOnInit() {
        this.languageService.getLanguageList().subscribe(data => this.languageList = data);
    }

    openNewLanguage() {
        this.language = new Language();
        this.submitted = false;
        this.languageDialog = true;
    }


    editLanguage(language: Language) {
        this.language = { ...language };
        this.languageDialog = true;
    }

    deleteLanguage(language: Language) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + language.Name + '?',
            header: this.l.instant('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.languageList = this.languageList.filter(val => val.Id !== language.Id);
                this.language = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Language Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.languageDialog = false;
        this.submitted = false;
    }

    saveLanguage() {
        this.submitted = true;
    }


}
