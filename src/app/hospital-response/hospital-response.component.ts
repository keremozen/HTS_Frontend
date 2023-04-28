import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { BranchDto } from '@proxy/dto/branch';
import { HospitalResponseDto } from '@proxy/dto/hospital-response';
import { HospitalizationTypeDto } from '@proxy/dto/hospitalization-type';
import { PatientDto } from '@proxy/dto/patient';
import { ProcessDto } from '@proxy/dto/process';
import { BranchService, HospitalResponseService, HospitalizationTypeService } from '@proxy/service';
import { forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/app-component-base';

@Component({
  selector: 'app-hospital-response',
  templateUrl: './hospital-response.component.html',
  styleUrls: ['./hospital-response.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HospitalResponseComponent extends AppComponentBase {

  patient: PatientDto;
  documents: any[] = [];
  hospitalResponseList: HospitalResponseDto[] = [];
  hospitalizationTypeList: HospitalizationTypeDto[] = [];
  branchList: BranchDto[] = [];
  selectedHospitalResponse: HospitalResponseDto;
  selectedHospitalizationType: HospitalizationTypeDto;
  selectedBranches: BranchDto[] = [];
  earliestTreatmentDate: Date;
  numberOfHospitalizationDays: number;
  anticipatedProcesses: ProcessDto[] = [];
  anticipatedSupplies: any[] = [];
  loading: boolean;
  totalRecords: number;
  isAllowedToManage: boolean = false;

  constructor(
    injector: Injector,
    private hostipalResponseService: HospitalResponseService,
    private hospitalizationTypeService: HospitalizationTypeService,
    private branchService: BranchService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    forkJoin([
      this.hostipalResponseService.getList(),
      this.hospitalizationTypeService.getList(),
      this.branchService.getList()
    ]).subscribe(
      {
        next: ([
          resHospitalResponseList,
          resHospitalizationTypeList,
          resBranchList
        ]) => {
          this.hospitalResponseList = resHospitalResponseList.items;
          this.hospitalizationTypeList = resHospitalizationTypeList.items;
          this.branchList = resBranchList.items;
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


}
