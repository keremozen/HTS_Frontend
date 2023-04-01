import { Component, Injector } from '@angular/core';
import { HospitalDto, SaveHospitalDto } from '@proxy/dto/hospital';
import { HospitalStaffDto, SaveHospitalStaffDto } from '@proxy/dto/hospital-staff';
import { NationalityDto } from '@proxy/dto/nationality';
import { HospitalService, HospitalStaffService, NationalityService, UserService } from '@proxy/service';
import { IdentityUserDto } from '@proxy/volo/abp/identity';
import { forkJoin } from 'rxjs';
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
  hospitalList: HospitalWithStaff[];
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
  selectedHospitalStaff: string[] = [];

  constructor(
    injector: Injector,
    private hospitalService: HospitalService,
    private hospitalStaffService: HospitalStaffService,
    private nationalityService: NationalityService,
    private userService: UserService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;

    forkJoin([
      this.nationalityService.getList(),
      this.hospitalService.getList(),
      this.userService.getByRole("UHB Yetkilisi")
    ]).subscribe(
      {
        next: ([
          resNationalityList,
          resHospitalList,
          resUserList
        ]) => {
          this.nationalityList = resNationalityList.items;
          this.hospitalList = [];
          resHospitalList.items.forEach(hospital => {
            let hospitalwithstaff = hospital as HospitalWithStaff;
            this.hospitalStaffService.getByInstitutionList(hospital.id).subscribe({
              next: (res) => {
                hospitalwithstaff.staffList = res.items.map(s=> (s.user?.name + " " + s.user?.surname)).join(", ");
              }
            });
            this.hospitalList.push(hospitalwithstaff);
          });
          this.uhbUserList = resUserList;
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
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.loading = true;
    this.hospitalStaffService.getByInstitutionList(this.hospitalToBeEdited.id).subscribe({
      next: (resStaffList) => {
        this.hospitalStaffList = resStaffList.items as HospitalStaffDto[];
        this.hospitalStaffTotalRecords = resStaffList.totalCount;
        /*this.hospitalStaffList.forEach(staff => {
          this.userService.getByIdById(staff.id)
        });*/
      },
      error: () => {
        this.loading = false;
        this.hospitalStaffToBeEdited = null;
      },
      complete: () => {
        this.hospitalStaffListDialog = true;
        this.loading = false;
      }
    });
  }

  openNewStaff() {
    this.isEdit = false;
    this.hospitalStaff = {} as SaveHospitalStaffDto;
    this.hospitalStaff.hospitalId = this.hospitalToBeEdited.id;
    this.hospitalStaff.isActive = true;
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
            this.fetchStaffData();
            this.hideStaffDialog();
          }
        });
      }
    });
  }

  saveHospitalStaff() {
    if (!this.isEdit && this.selectedHospitalStaff.length > 0) {
      let staffDtoList: SaveHospitalStaffDto[] = [];
      this.selectedHospitalStaff.forEach(staff => {
        staffDtoList.push({
          hospitalId: this.hospitalToBeEdited.id,
          isActive: this.hospitalStaff.isActive,
          userId: staff
        })
      });
      this.hospitalStaffService.save(this.hospitalToBeEdited.id, staffDtoList).subscribe({
        complete: () => {
          this.fetchStaffData();
          this.hideStaffDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:HospitalStaff:Name')));
        }
      });
    }
  }

  hideStaffDialog() {
    this.hospitalStaff = null;
    this.hospitalStaffToBeEdited = null;
    this.hospitalStaffEditDialog = false;
  }

}

class HospitalWithStaff implements HospitalDto {
  name?: string;
  phoneNumber?: string;
  phoneCountryCodeId?: number;
  email?: string;
  isActive: boolean;
  id?: number;
  staffList: string;
}