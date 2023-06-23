import { Injectable } from "@angular/core";
import { BranchDto } from "@proxy/dto/branch";
import { CityDto } from "@proxy/dto/city";
import { ContractedInstitutionDto } from "@proxy/dto/contracted-institution";
import { CurrencyDto } from "@proxy/dto/currency";
import { DocumentTypeDto } from "@proxy/dto/document-type";
import { GenderDto } from "@proxy/dto/gender";
import { HospitalDto } from "@proxy/dto/hospital";
import { NationalityDto } from "@proxy/dto/nationality";
import { PatientAdmissionMethodDto } from "@proxy/dto/patient-admission-method";
import { ProcessTypeDto } from "@proxy/dto/process-type";
import { TreatmentTypeDto } from "@proxy/dto/treatment-type";
import { BranchService, CityService, ContractedInstitutionService, CurrencyService, DocumentTypeService, GenderService, HospitalService, LanguageService, NationalityService, PatientAdmissionMethodService, ProcessTypeService, TreatmentTypeService } from "@proxy/service";
import { forkJoin } from "rxjs";

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
    public contractedInstitutionList: ContractedInstitutionDto[] = [];

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
        private treatmentTypeService: TreatmentTypeService,
        private processTypeService: ProcessTypeService,
        private contractedInstitutionService: ContractedInstitutionService
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
                this.contractedInstitutionService.getList(true)
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
                        resContractedInstitutionList
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
                        this.contractedInstitutionList = resContractedInstitutionList.items;
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