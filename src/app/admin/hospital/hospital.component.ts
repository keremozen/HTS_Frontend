import { Component, Injector } from '@angular/core';
import { CityDto } from '@proxy/dto/city';
import { HospitalDto, SaveHospitalDto } from '@proxy/dto/hospital';
import { HospitalStaffDto, SaveHospitalStaffDto } from '@proxy/dto/hospital-staff';
import { HospitalUHBStaffDto, SaveHospitalUHBStaffDto } from '@proxy/dto/hospital-uhbstaff';
import { NationalityDto } from '@proxy/dto/nationality';
import { HospitalService, HospitalStaffService, HospitalUHBStaffService, UserService } from '@proxy/service';
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
  hospitalUHBStaffListDialog: boolean;
  hospitalUHBStaffEditDialog: boolean;
  hospitalList: HospitalWithStaffNames[];
  hospital: SaveHospitalDto;
  isEdit: boolean;
  hospitalToBeEdited: HospitalDto;
  totalRecords: number = 0;
  hospitalStaffList: HospitalStaffDto[] = [];
  hospitalStaffTotalRecords: number = 0;
  hospitalUHBStaffList: HospitalUHBStaffDto[] = [];
  hospitalUHBStaffTotalRecords: number = 0;
  hospitalStaff: SaveHospitalStaffDto;
  hospitalStaffToBeEdited: HospitalStaffDto;
  hospitalUHBStaff: SaveHospitalUHBStaffDto;
  hospitalUHBStaffToBeEdited: HospitalUHBStaffDto;
  uhbUserList: IdentityUserDto[] = [];
  selectedHospitalStaff: IdentityUserDto;
  cityList: CityDto[] = [];

  constructor(
    injector: Injector,
    private hospitalService: HospitalService,
    private hospitalStaffService: HospitalStaffService,
    private hospitalUHBStaffService: HospitalUHBStaffService,
    private commonService: CommonService,
    private userService: UserService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.nationalityList = this.commonService.nationalityList;
    this.cityList = this.commonService.cityList;
    forkJoin([
      this.hospitalService.getList(),
      this.userService.getUhbStaffList()
    ]).subscribe(
      {
        next: ([
          resHospitalList,
          resUserList
        ]) => {
          this.commonService.hospitalList = resHospitalList.items.filter(h => h.isActive == true);
          this.totalRecords = resHospitalList.totalCount;
          this.hospitalList = [];
          resHospitalList.items.forEach(hospital => {
            let hospitalwithstaff = hospital as HospitalWithStaffNames;
            hospitalwithstaff.hospitalStaffNames = hospital.hospitalStaffs.filter(s => s.isActive).map(s => s.user.name + " " + s.user.surname).join("<br>");
            hospitalwithstaff.hospitalUHBStaffNames = hospital.hospitalUHBStaffs.map(s => s.name + " " + s.surname).join("<br>");
            this.hospitalList.push(hospitalwithstaff);
          });
          this.uhbUserList = resUserList;
          if (this.hospitalToBeEdited) {
            this.hospitalToBeEdited = this.hospitalList.find(h=>h.id == this.hospitalToBeEdited.id);
            this.fetchHospitalStaff();
            this.fetchHospitalUHBStaff();
          }
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

  openUHBStaffDialog(hospital: HospitalDto) {
    this.hospitalToBeEdited = hospital;
    this.fetchHospitalUHBStaff();
    this.hospitalUHBStaffListDialog = true;
  }

  fetchHospitalStaff() {
    this.hospitalStaffList = this.hospitalToBeEdited.hospitalStaffs as HospitalStaffDto[];
    this.hospitalStaffTotalRecords = this.hospitalToBeEdited.hospitalStaffs.length;
  }

  fetchHospitalUHBStaff() {
    this.hospitalUHBStaffList = this.hospitalToBeEdited.hospitalUHBStaffs as HospitalUHBStaffDto[];
    this.hospitalUHBStaffTotalRecords = this.hospitalToBeEdited.hospitalUHBStaffs.length;
  }

  openNewStaff() {
    this.isEdit = false;
    this.hospitalStaff = {} as SaveHospitalStaffDto;
    this.hospitalStaff.hospitalId = this.hospitalToBeEdited.id;
    this.hospitalStaff.isActive = true;
    this.hospitalStaffEditDialog = true;
  }

  openNewUHBStaff() {
    this.isEdit = false;
    this.hospitalUHBStaff = {} as SaveHospitalUHBStaffDto;
    this.hospitalUHBStaff.hospitalId = this.hospitalToBeEdited.id;
    this.hospitalUHBStaffEditDialog = true;
  }

  editStaff(hospitalStaff: HospitalStaffDto) {
    this.isEdit = true;
    this.hospitalStaffToBeEdited = hospitalStaff;
    this.hospitalStaff = { ...hospitalStaff as SaveHospitalStaffDto };
    this.selectedHospitalStaff = hospitalStaff.user;
    this.hospitalStaffEditDialog = true;
  }

  editUHBStaff(hospitalUHBStaff: HospitalUHBStaffDto) {
    this.isEdit = true;
    this.hospitalUHBStaffToBeEdited = hospitalUHBStaff;
    this.hospitalUHBStaff = { ...hospitalUHBStaff as SaveHospitalUHBStaffDto };
    this.hospitalUHBStaffEditDialog = true;
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

  deleteUHBStaff(hospitalUHBStaff: HospitalUHBStaffDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', (hospitalUHBStaff.name + " " + hospitalUHBStaff.surname)),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hospitalUHBStaffService.delete(hospitalUHBStaff.id).subscribe({
          complete: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:HospitalUHBStaff:Name')));
            this.fetchData();
            this.hideUHBStaffDialog();
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

  saveHospitalUHBStaff() {
    let staffDto: SaveHospitalUHBStaffDto = {
      hospitalId: this.hospitalToBeEdited.id,
      name: this.hospitalUHBStaff.name,
      surname: this.hospitalUHBStaff.surname,
      email: this.hospitalUHBStaff.email
    };
    if (!this.isEdit) {
      this.hospitalUHBStaffService.create(staffDto).subscribe({
        complete: () => {
          this.fetchData();
          this.hideUHBStaffDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalUHBStaff:Name')));
        }
      });
    }
    else {
      this.hospitalUHBStaffService.update(this.hospitalUHBStaffToBeEdited.id, staffDto).subscribe({
        complete: () => {
          this.fetchData();
          this.hideUHBStaffDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalUHBStaff:Name')));
        }
      });
    }
  }

  hideStaffDialog() {
    this.hospitalStaff = null;
    this.hospitalStaffToBeEdited = null;
    this.hospitalStaffEditDialog = false;
    this.selectedHospitalStaff = null;
  }

  hideUHBStaffDialog() {
    this.hospitalUHBStaff = null;
    this.hospitalUHBStaffToBeEdited = null;
    this.hospitalUHBStaffEditDialog = false;
    
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
  hospitalUHBStaffs: HospitalUHBStaffDto[];
  hospitalStaffNames: string;
  hospitalUHBStaffNames: string;
  id?: number;
}