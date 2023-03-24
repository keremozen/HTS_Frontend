import { Component, Injector } from '@angular/core';
import { LanguageDto, SaveLanguageDto } from '@proxy/dto/language';
import { LanguageService } from '@proxy/service/language.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


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
export class LanguageComponent extends AppComponentBase {

    languageDialog: boolean;
    languageList: LanguageDto[];
    language: SaveLanguageDto;
    isEdit: boolean;
    languageToBeEdited: LanguageDto;

    constructor(
        injector: Injector,
        private languageService: LanguageService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.languageService.getList().subscribe(data => this.languageList = data.items as LanguageDto[]);
    }

    openNewLanguage() {
        this.isEdit = false;
        this.language = {} as SaveLanguageDto;
        this.language.isActive = true;
        this.languageDialog = true;
    }

    editLanguage(language: LanguageDto) {
        this.isEdit = true;
        this.languageToBeEdited = language;
        this.language = { ...language as SaveLanguageDto };
        this.languageDialog = true;
    }

    deleteLanguage(language: LanguageDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', language.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.languageService.delete(language.id).subscribe({
                    next: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:Language:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveLanguage() {
        if (!this.isEdit) {
            this.languageService.create(this.language).subscribe({
                next: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Language:Name')));
                },
                error: (error: any) => {
                    this.hideDialog();
                }
            });
        }
        else {
            this.languageService.update(this.languageToBeEdited.id, this.language).subscribe({
                next: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Language:Name')));
                },
                error: (error: any) => {
                    this.hideDialog();
                }
            });
        }
    }

    hideDialog() {
        this.language = null;
        this.languageToBeEdited = null;
        this.languageDialog = false;
    }

}
