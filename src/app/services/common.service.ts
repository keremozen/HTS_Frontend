import { Injectable } from "@angular/core";
import { BranchDto } from "@proxy/dto/branch";
import { CityDto } from "@proxy/dto/city";
import { ContractedInstitutionDto } from "@proxy/dto/contracted-institution";
import { CurrencyDto } from "@proxy/dto/currency";
import { DocumentTypeDto } from "@proxy/dto/document-type";
import { FinalizationTypeDto } from "@proxy/dto/finalization-type";
import { GenderDto } from "@proxy/dto/gender";
import { HospitalDto } from "@proxy/dto/hospital";
import { HTSTaskDto } from "@proxy/dto/htstask";
import { NationalityDto } from "@proxy/dto/nationality";
import { PatientAdmissionMethodDto } from "@proxy/dto/patient-admission-method";
import { ProcessKindDto } from "@proxy/dto/process-kind";
import { ProcessTypeDto } from "@proxy/dto/process-type";
import { TreatmentTypeDto } from "@proxy/dto/treatment-type";
import { BranchService, CityService, ContractedInstitutionService, CurrencyService, DocumentTypeService, FinalizationTypeService, GenderService, HTSTaskService, HospitalService, LanguageService, NationalityService, PatientAdmissionMethodService, ProcessKindService, ProcessTypeService, TreatmentTypeService } from "@proxy/service";
import { BehaviorSubject, forkJoin } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    public nationalityList: NationalityDto[] = [];
    public languageList: NationalityDto[] = [];
    public hospitalList: HospitalDto[] = [];
    public genderList: GenderDto[] = [];
    public cityList: CityDto[] = [];
    public currencyList: CurrencyDto[] = [];
    public documentTypeList: DocumentTypeDto[] = [];
    public patientAdmissionMethodList: PatientAdmissionMethodDto[] = [];
    public branchList: BranchDto[] = [];
    public treatmentTypeList: TreatmentTypeDto[] = [];
    public processTypeList: ProcessTypeDto[] = [];
    public processKindList: ProcessKindDto[] = [];
    public contractedInstitutionList: ContractedInstitutionDto[] = [];
    public finalizationTypeList: FinalizationTypeDto[] = [];
    //public taskList: HTSTaskDto[] = [];
    private taskSource = new BehaviorSubject<HTSTaskDto[]>(null);
    public taskList = this.taskSource.asObservable();

    addTaskList(value: HTSTaskDto[]) {
        this.taskSource.next(value);
    }

    constructor(
        private nationalityService: NationalityService,
        private languageService: LanguageService,
        private hospitalService: HospitalService,
        private genderService: GenderService,
        private cityService: CityService,
        private currencyService: CurrencyService,
        private documentTypeService: DocumentTypeService,
        private patientAdmissionMethodService: PatientAdmissionMethodService,
        private branchService: BranchService,
        private finalizationTypeService: FinalizationTypeService,
        private treatmentTypeService: TreatmentTypeService,
        private processTypeService: ProcessTypeService,
        private processKindService: ProcessKindService,
        private contractedInstitutionService: ContractedInstitutionService,
        private taskService: HTSTaskService
    ) {
    }

    setInitialData() {
        return new Promise((resolve, reject) => {
            forkJoin([
                this.nationalityService.getList(true),
                this.languageService.getList(true),
                this.hospitalService.getList(true),
                this.genderService.getList(),
                this.cityService.getList(),
                this.currencyService.getList(),
                this.documentTypeService.getList(true),
                this.patientAdmissionMethodService.getList(true),
                this.branchService.getList(true),
                this.treatmentTypeService.getList(true),
                this.processTypeService.getList(true),
                this.processKindService.getList(true),
                this.contractedInstitutionService.getList(true),
                this.taskService.getList(),
                this.finalizationTypeService.getList(),
            ]).subscribe(
                {
                    next: ([
                        resNationalityList,
                        resLanguageList,
                        resHospitalList,
                        resGenderList,
                        resCityList,
                        resCurrencyList,
                        resDocumentTypeList,
                        resPatientAdmissionMethodList,
                        resBranchList,
                        resTreatmentTypeList,
                        resProcessTypeList,
                        resProcessKindList,
                        resContractedInstitutionList,
                        resTaskList,
                        resFinalizationTypeList
                    ]) => {
                        this.nationalityList = resNationalityList.items;
                        this.languageList = resLanguageList.items;
                        this.hospitalList = resHospitalList.items;
                        this.genderList = resGenderList.items;
                        this.cityList = resCityList.items;
                        this.currencyList = resCurrencyList.items;
                        this.documentTypeList = resDocumentTypeList.items;
                        this.patientAdmissionMethodList = resPatientAdmissionMethodList.items;
                        this.branchList = resBranchList.items;
                        this.treatmentTypeList = resTreatmentTypeList.items;
                        this.processTypeList = resProcessTypeList.items;
                        this.processKindList = resProcessKindList.items;
                        this.contractedInstitutionList = resContractedInstitutionList.items;
                        this.addTaskList(resTaskList.items);
                        this.finalizationTypeList = resFinalizationTypeList.items;
                    },
                    error: (error: any) => {
                        resolve(error);
                    },
                    complete: () => {
                        resolve(true);
                    }
                }
            );
        });
    }

}