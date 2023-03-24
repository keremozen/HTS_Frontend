import { Component, Injector } from '@angular/core';
import { NationalityDto, SaveNationalityDto } from '@proxy/dto/nationality';
import { NationalityService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-nationality',
    templateUrl: './nationality.component.html',
    styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent extends AppComponentBase {

    nationalityDialog: boolean;
    nationalityList: NationalityDto[];
    nationality: SaveNationalityDto;
    isEdit: boolean;
    nationalityToBeEdited: NationalityDto;

    constructor(
        injector: Injector,
        private nationalityService: NationalityService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.nationalityService.getList().subscribe(data => this.nationalityList = data.items);
    }

    openNewNationality() {
        this.isEdit = false;
        this.nationality = {} as SaveNationalityDto;
        this.nationality.isActive = true;
        this.nationalityDialog = true;
    }
    
    editNationality(nationality: NationalityDto) {
        this.isEdit = true;
        this.nationalityToBeEdited = nationality;
        this.nationality = { ...nationality as SaveNationalityDto };
        this.nationalityDialog = true;
    }

    deleteNationality(nationality: NationalityDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', nationality.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.nationalityService.delete(nationality.id).subscribe({
                    next: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:Nationality:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveNationality() {
        if (!this.isEdit) {
            this.nationalityService.create(this.nationality).subscribe({
                next: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Nationality:Name')));
                },
                error: (error: any) => {
                    this.hideDialog();
                }
            });
        }
        else {
            this.nationalityService.update(this.nationalityToBeEdited.id, this.nationality).subscribe({
                next: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Nationality:Name')));
                },
                error: (error: any) => {
                    this.hideDialog();
                }
            });
        }
    }

    hideDialog() {
        this.nationality = null;
        this.nationalityToBeEdited = null;
        this.nationalityDialog = false;
    }
}
