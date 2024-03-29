import { Component, Injector } from '@angular/core';
import { ContractedInstitutionDto, SaveContractedInstitutionDto } from '@proxy/dto/contracted-institution';
import { ContractedInstitutionKindDto } from '@proxy/dto/contracted-institution-kind';
import { ContractedInstitutionStaffDto, SaveContractedInstitutionStaffDto } from '@proxy/dto/contracted-institution-staff';
import { ContractedInstitutionTypeDto } from '@proxy/dto/contracted-institution-type';
import { NationalityDto } from '@proxy/dto/nationality';
import { ContractedInstitutionKindService, ContractedInstitutionService, ContractedInstitutionStaffService, ContractedInstitutionTypeService, NationalityService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-contracted-institution',
  templateUrl: './contracted-institution.component.html',
  styleUrls: ['./contracted-institution.component.scss']
})
export class ContractedInstitutionComponent extends AppComponentBase {
  contractedInstitutionDialog: boolean;
  contractedInstitutionStaffDialog: boolean;
  contractedInstitutionStaffEditDialog: boolean;
  contractedInstitutionList: ContractedInstitutionWithStaff[];
  contractedInstitution: SaveContractedInstitutionDto;
  isEdit: boolean;
  contractedInstitutionToBeEdited: ContractedInstitutionDto;
  loading: boolean;
  totalRecords: number = 0;
  staffList: ContractedInstitutionStaffDto[] = [];
  staffTotalCount: number = 0;
  contractedInstitutionStaff: SaveContractedInstitutionStaffDto;
  contractedInstitutionStaffToBeEdited: ContractedInstitutionStaffDto;
  nationalityList: NationalityDto[] = [];
  typeList: ContractedInstitutionTypeDto[] = [];
  kindList: ContractedInstitutionKindDto[] = [];

  constructor(
    injector: Injector,
    private contractedInstitutionService: ContractedInstitutionService,
    private contractedInstitutionTypeService: ContractedInstitutionTypeService,
    private contractedInstitutionKindService: ContractedInstitutionKindService,
    private contractedInstitutionStaffService: ContractedInstitutionStaffService,
    private commonService: CommonService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.nationalityList = this.commonService.nationalityList;

    forkJoin([
      this.contractedInstitutionTypeService.getList(),
      this.contractedInstitutionKindService.getList(),
      this.contractedInstitutionService.getList()
    ]).subscribe({
      next:
        ([
          resTypeList,
          resKindList,
          resContractedInstitutionList
        ]) => {
          this.typeList = resTypeList.items;
          this.kindList = resKindList.items;
          this.contractedInstitutionList = [];
          resContractedInstitutionList.items.forEach(inst => {
            let instwithstaff = inst as ContractedInstitutionWithStaff;
            instwithstaff.staffNames = inst.contractedInstitutionStaffs.filter(s => s.isActive).map(s => s.nameSurname).join("<br>");
            this.contractedInstitutionList.push(instwithstaff);
          });
          this.totalRecords = resContractedInstitutionList.totalCount;
          this.commonService.contractedInstitutionList = resContractedInstitutionList.items.filter(c => c.isActive == true);
        },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openNewContractedInstitution() {
    this.isEdit = false;
    this.contractedInstitution = {} as SaveContractedInstitutionDto;
    this.contractedInstitution.isActive = true;
    this.contractedInstitutionDialog = true;
  }

  editContractedInstitution(contractedInstitution: ContractedInstitutionDto) {
    this.isEdit = true;
    this.contractedInstitutionToBeEdited = contractedInstitution;
    this.contractedInstitution = { ...contractedInstitution as SaveContractedInstitutionDto };
    this.contractedInstitutionDialog = true;
  }

  deleteContractedInstitution(contractedInstitution: ContractedInstitutionDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', contractedInstitution.name),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contractedInstitutionService.delete(contractedInstitution.id).subscribe({
          complete: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:ContractedInstitution:Name')));
            this.fetchData();
            this.hideDialog();
          }
        });
      }
    });
  }

  saveContractedInstitution() {
    if (!this.isEdit) {
      this.contractedInstitutionService.create(this.contractedInstitution).subscribe({
        complete: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitution:Name')));
        }
      });
    }
    else {
      this.contractedInstitutionService.update(this.contractedInstitutionToBeEdited.id, this.contractedInstitution).subscribe({
        complete: () => {
          this.fetchData();
          this.hideDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitution:Name')));
        }
      });
    }
  }

  openStaffDialog(contractedInstitution: ContractedInstitutionDto) {
    this.contractedInstitutionToBeEdited = contractedInstitution;
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.loading = true;
    this.contractedInstitutionStaffService.getByInstitutionList(this.contractedInstitutionToBeEdited.id).subscribe({
      next: (resStaffList) => {
        this.staffList = resStaffList.items;
        this.staffTotalCount = resStaffList.totalCount;
      },
      error: () => {
        this.loading = false;
        this.contractedInstitutionToBeEdited = null;
      },
      complete: () => {
        this.contractedInstitutionStaffDialog = true;
        this.loading = false;
      }
    });
  }

  hideDialog() {
    this.contractedInstitution = null;
    this.contractedInstitutionToBeEdited = null;
    this.contractedInstitutionDialog = false;
  }

  refreshContractedInstitution() {
    this.fetchData();
  }

  openNewStaff() {
    this.isEdit = false;
    this.contractedInstitutionStaff = {} as SaveContractedInstitutionStaffDto;
    this.contractedInstitutionStaff.contractedInstitutionId = this.contractedInstitutionToBeEdited.id;
    this.contractedInstitutionStaff.isActive = true;
    this.contractedInstitutionStaffEditDialog = true;
  }

  editStaff(contractedInstitutionStaff: ContractedInstitutionStaffDto) {
    this.isEdit = true;
    this.contractedInstitutionStaffToBeEdited = contractedInstitutionStaff;
    this.contractedInstitutionStaff = { ...contractedInstitutionStaff as SaveContractedInstitutionStaffDto };
    this.contractedInstitutionStaffEditDialog = true;
  }

  deleteStaff(contractedInstitutionStaff: ContractedInstitutionStaffDto) {
    this.confirm({
      message: this.l('::Message:DeleteConfirmation', contractedInstitutionStaff.nameSurname),
      header: this.l('::Confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contractedInstitutionStaffService.delete(contractedInstitutionStaff.id).subscribe({
          complete: () => {
            this.success(this.l('::Message:SuccessfulDeletion', this.l('::Admin:ContractedInstitutionStaff:Name')));
            this.fetchStaffData();
            this.hideStaffDialog();
          }
        });
      }
    });
  }

  saveContractedInstitutionStaff() {
    if (!this.isEdit) {
      this.contractedInstitutionStaffService.create(this.contractedInstitutionStaff).subscribe({
        complete: () => {
          this.fetchStaffData();
          this.hideStaffDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitutionStaff:Name')));
        }
      });
    }
    else {
      this.contractedInstitutionStaffService.update(this.contractedInstitutionStaffToBeEdited.id, this.contractedInstitutionStaff).subscribe({
        complete: () => {
          this.fetchStaffData();
          this.hideStaffDialog();
          this.success(this.l('::Message:SuccessfulSave', this.l('::Admin:ContractedInstitutionStaff:Name')));
        }
      });
    }
  }

  hideStaffDialog() {
    this.contractedInstitutionStaff = null;
    this.contractedInstitutionStaffToBeEdited = null;
    this.contractedInstitutionStaffEditDialog = false;
  }


}

class ContractedInstitutionWithStaff implements ContractedInstitutionDto {
  typeId: number;
  kindId: number;
  kind: ContractedInstitutionKindDto;
  type: ContractedInstitutionTypeDto;
  contractedInstitutionStaffs: ContractedInstitutionStaffDto[];
  email?: string;
  phoneNumber?: string;
  phoneCountryCodeId: number;
  nationalityId: number;
  site?: string;
  address?: string;
  phoneCountryCode: NationalityDto;
  nationality: NationalityDto;
  name?: string;
  description?: string;
  isActive: boolean;
  id?: number;
  staffNames: string;
}