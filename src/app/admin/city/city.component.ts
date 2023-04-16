import { Component, Injector } from '@angular/core';
import { CityDto, SaveCityDto } from '@proxy/dto/city';
import { CityService } from '@proxy/service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';


@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `]
})
export class CityComponent extends AppComponentBase {

    cityDialog: boolean;
    cityList: CityDto[];
    city: SaveCityDto;
    isEdit: boolean;
    cityToBeEdited: CityDto;
    loading: boolean;
    totalRecords: number = 0;

    constructor(
        injector: Injector,
        private cityService: CityService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.cityService.getList().subscribe({
          next: data => {
            this.cityList = data.items;
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

    openNewCity() {
        this.isEdit = false;
        this.city = {} as SaveCityDto;
        this.cityDialog = true;
    }

    editCity(city: CityDto) {
        this.isEdit = true;
        this.cityToBeEdited = city;
        this.city = { ...city as SaveCityDto };
        this.cityDialog = true;
    }

    deleteCity(city: CityDto) {
        this.confirm({
            message: this.l('::Message:DeleteConfirmation', city.name),
            header: this.l('::Confirm'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.cityService.delete(city.id).subscribe({
                    complete: () => {
                        this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:City:Name')));
                        this.fetchData();
                        this.hideDialog();
                    }
                });
            }
        });
    }

    saveCity() {
        if (!this.isEdit) {
            this.cityService.create(this.city).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:City:Name')));
                },
                error: (error: any) => {
                  this.hideDialog();
                }
            });
        }
        else {
            this.cityService.update(this.cityToBeEdited.id, this.city).subscribe({
                complete: () => {
                    this.fetchData();
                    this.hideDialog();
                    this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:City:Name')));
                },
                error: (error: any) => {
                  this.hideDialog();
                }
            });
        }
    }

    hideDialog() {
        this.city = null;
        this.cityToBeEdited = null;
        this.cityDialog = false;
    }

}
