import { Component, Injector } from '@angular/core';
import { HospitalResponseDto, SaveHospitalResponseDto } from '@proxy/dto/hospital-response';
import { HospitalResponseService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-hospital-response',
    templateUrl: './hospital-response.component.html',
    styleUrls: ['./hospital-response.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class HospitalResponseComponent extends AppComponentBase {

    hospitalResponseDialog: boolean;
    hospitalResponseList: HospitalResponseDto[];
    hospitalResponse: SaveHospitalResponseDto;
    isEdit: boolean;
    hospitalResponseToBeEdited: HospitalResponseDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private hospitalResponseService: HospitalResponseService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.hospitalResponseService.getList().subscribe({
          next: data => {
            this.hospitalResponseList = data.items;
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

    openNewHospitalResponse() {
        this.isEdit = false;
        this.hospitalResponse = {} as SaveHospitalResponseDto;
        this.hospitalResponse.isAssessable = false;
        this.hospitalResponse.isActive = true;
        this.hospitalResponseDialog = true;
    }


    editHospitalResponse(hospitalResponse: HospitalResponseDto) {
        this.isEdit = true;
        this.hospitalResponseToBeEdited = hospitalResponse;
        this.hospitalResponse = { ...hospitalResponse as SaveHospitalResponseDto };
        this.hospitalResponseDialog = true;
    }


    deleteHospitalResponse(hospitalResponse: HospitalResponseDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', hospitalResponse.response),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.hospitalResponseService.delete(hospitalResponse.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:HospitalResponse:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveHospitalResponse() {
        if (!this.isEdit) {
            this.hospitalResponseService.create(this.hospitalResponse).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalResponse:Name')));
                }
            });
        }
        else {
            this.hospitalResponseService.update(this.hospitalResponseToBeEdited.id, this.hospitalResponse).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalResponse:Name')));
                }
            });
        }
    }

    hideDialog() {
        this.hospitalResponse = null;
        this.hospitalResponseToBeEdited = null;
        this.hospitalResponseDialog = false;
    }

}
