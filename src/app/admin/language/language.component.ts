import { Component, Injector } from '@angular/core';
import { LanguageDto, SaveLanguageDto } from '@proxy/dto/language';
import { LanguageService } from '@proxy/service/language.service';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';
import * as XLSX from 'xlsx';

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
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private languageService: LanguageService,
        private commonService: CommonService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.languageService.getList().subscribe({
            next: data => {
                this.languageList = data.items;
                this.totalRecords = data.totalCount;
                this.commonService.languageList = this.languageList.filter(l => l.isActive == true);
            },
            error: () => {
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        });
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
                    complete: () => {
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
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Language:Name')));
                }
            });
        }
        else {
            this.languageService.update(this.languageToBeEdited.id, this.language).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Language:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.language = null;
        this.languageToBeEdited = null;
        this.languageDialog = false;
    }

    myUploader(event) {
        for (let file of event.files) {
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];
                const data: SaveLanguageDto[] = JSON.parse(JSON.stringify((XLSX.utils.sheet_to_json(ws, { header: 0 }))));
                debugger;
                this.languageService.createList(data).subscribe({
                    complete: () => {
                        this.fetchData();
                        this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Language:Name')));
                    }
                })
            };
            reader.readAsBinaryString(file);
        }
    }
}