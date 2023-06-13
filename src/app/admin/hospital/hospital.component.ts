import { Component, Injector } from '@angular/core';
import { CityDto } from '@proxy/dto/city';
import { HospitalDto, SaveHospitalDto } from '@proxy/dto/hospital';
import { HospitalStaffDto, SaveHospitalStaffDto } from '@proxy/dto/hospital-staff';
import { NationalityDto } from '@proxy/dto/nationality';
import { CityService, HospitalService, HospitalStaffService, NationalityService, UserService } from '@proxy/service';
import { IdentityUserDto } from '@proxy/volo/abp/identity';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
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

  nationalityList: NationalityDto[] = [];
  hospitalDialog: boolean;
  hospitalStaffListDialog: boolean;
  hospitalStaffEditDialog: boolean;
  hospitalList: HospitalWithStaffNames[];
  hospital: SaveHospitalDto;
  isEdit: boolean;
  hospitalToBeEdited: HospitalDto;
  loading: boolean;
  totalRecords: number = 0;
  hospitalStaffList: HospitalStaffDto[] = [];
  hospitalStaffTotalRecords: number = 0;
  hospitalStaff: SaveHospitalStaffDto;
  hospitalStaffToBeEdited: HospitalStaffDto;
  uhbUserList: IdentityUserDto[] = [];
  selectedHospitalStaff: IdentityUserDto;
  cityList: CityDto[] = [];

  constructor(
    injector: Injector,
    private hospitalService: HospitalService,
    private hospitalStaffService: HospitalStaffService,
    private commonService: CommonService,
    private userService: UserService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.nationalityList = this.commonService.nationalityList;
    this.cityList = this.commonService.cityList;

    forkJoin([
      this.hospitalService.getList(),
      this.userService.getByRole("UHB Yetkilisi")
    ]).subscribe(
      {
        next: ([
          resHospitalList,
          resUserList
        ]) => {
          this.commonService.hospitalList = resHospitalList.items.filter(h=>h.isActive==true);
          this.totalRecords = resHospitalList.totalCount;
          this.hospitalList = [];
          resHospitalList.items.forEach(hospital => {
            let hospitalwithstaff = hospital as HospitalWithStaffNames;
            hospitalwithstaff.hospitalStaffNames = hospital.hospitalStaffs.filter(s => s.isActive).map(s => s.user.name + " " + s.user.surname).join("<br>");
            this.hospitalList.push(hospitalwithstaff);
          });
          this.uhbUserList = resUserList;
          if (this.hospitalToBeEdited) {
            this.hospitalToBeEdited = this.hospitalList.find(h=>h.id == this.hospitalToBeEdited.id);
            this.fetchHospitalStaff();
          }
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      }
    );
  }

  openNewHospital() {
    this.isEdit = false;
    this.hospital = {} as SaveHospitalDto;
    this.hospital.isActive = true;
    this.hospitalDialog = true;
  }

  editHospital(hospital: HospitalDto) {
    this.isEdit = true;
    this.hospitalToBeEdited = hospital;
    this.hospital = { ...hospital as SaveHospitalDto };
    this.hospitalDialog = true;
  }

  deleteHospital(hospital: HospitalDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', hospital.name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hospitalService.delete(hospital.id).subscribe({
          complete: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:Hospital:Name')));
            this.fetchData();
            this.hideDialog();
          }
        });
      }
    });
  }

  saveHospital() {
    if (!this.isEdit) {
      this.hospitalService.create(this.hospital).subscribe({
        complete: () => {
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Hospital:Name')));
          this.fetchData();
          this.hideDialog();
        }
      });
    }
    else {
      this.hospitalService.update(this.hospitalToBeEdited.id, this.hospital).subscribe({
        complete: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:Hospital:Name')));
        }
      });
    }
  }

  hideDialog() {
    this.hospital = null;
    this.hospitalToBeEdited = null;
    this.hospitalDialog = false;
  }

  refreshHospital() {
    this.fetchData();
  }

  openStaffDialog(hospital: HospitalDto) {
    this.hospitalToBeEdited = hospital;
    this.fetchHospitalStaff();
    this.hospitalStaffListDialog = true;
  }

  fetchHospitalStaff() {
    this.hospitalStaffList = this.hospitalToBeEdited.hospitalStaffs as HospitalStaffDto[];
    this.hospitalStaffTotalRecords = this.hospitalToBeEdited.hospitalStaffs.length;
  }

  openNewStaff() {
    this.isEdit = false;
    this.hospitalStaff = {} as SaveHospitalStaffDto;
    this.hospitalStaff.hospitalId = this.hospitalToBeEdited.id;
    this.hospitalStaff.isActive = true;
    this.hospitalStaffEditDialog = true;
  }

  editStaff(hospitalStaff: HospitalStaffDto) {
    this.isEdit = true;
    this.hospitalStaffToBeEdited = hospitalStaff;
    this.hospitalStaff = { ...hospitalStaff as SaveHospitalStaffDto };
    this.selectedHospitalStaff = hospitalStaff.user;
    this.hospitalStaffEditDialog = true;
  }

  deleteStaff(hospitalStaff: HospitalStaffDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', (hospitalStaff.user?.name + " " + hospitalStaff.user?.surname)),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hospitalStaffService.delete(hospitalStaff.id).subscribe({
          complete: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:HospitalStaff:Name')));
            this.fetchData();
            this.hideStaffDialog();
          }
        });
      }
    });
  }

  saveHospitalStaff() {
    if (this.selectedHospitalStaff) {
      let staffDto: SaveHospitalStaffDto = {
        hospitalId: this.hospitalToBeEdited.id,
        isActive: this.hospitalStaff.isActive,
        isDefault: this.hospitalStaff.isDefault,
        userId: this.selectedHospitalStaff.id
      };
      if (!this.isEdit) {
        this.hospitalStaffService.create(staffDto).subscribe({
          complete: () => {
            this.fetchData();
            this.hideStaffDialog();
            this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalStaff:Name')));
          }
        });
      }
      else {
        this.hospitalStaffService.update(this.hospitalStaffToBeEdited.id, staffDto).subscribe({
          complete: () => {
            this.fetchData();
            this.hideStaffDialog();
            this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalStaff:Name')));
          }
        });
      }
    }
  }

  hideStaffDialog() {
    this.hospitalStaff = null;
    this.hospitalStaffToBeEdited = null;
    this.hospitalStaffEditDialog = false;
    this.selectedHospitalStaff = null;
  }

}

class HospitalWithStaffNames implements HospitalDto {
  name?: string;
  code?: string;
  address?: string;
  cityId: number;
  phoneNumber?: string;
  phoneCountryCodeId?: number;
  email?: string;
  isActive: boolean;
  phoneCountryCode: NationalityDto;
  city: CityDto;
  hospitalStaffs: HospitalStaffDto[];
  hospitalStaffNames: string;
  id?: number;

}