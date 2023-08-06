import { RoutesService, eLayoutType } from '@abp/ng.core';
import { eThemeSharedRouteNames } from '@abp/ng.theme.shared';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application
      },
      {
        path: '/patient',
        name: '::Menu:Patients',
        iconClass: 'fas fa-hospital-user',
        order: 2,
        requiredPolicy: 'HTS.PatientAccess',
        layout: eLayoutType.application
      },
      {
        path: '/hospital-response/:uid',
        name: '::Menu:Patients1',
        order: 3,
        invisible: true,
        layout: eLayoutType.empty
      },
      {
        path: '/admin/hospital',
        name: '::Menu:Admin:Hospital',
        iconClass: 'fas fa-h-square',
        parentName: eThemeSharedRouteNames.Administration,
        order: 100,
        requiredPolicy: 'HTS.HospitalManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/nationality',
        name: '::Menu:Admin:Nationality',
        iconClass: 'fas fa-passport',
        parentName: eThemeSharedRouteNames.Administration,
        order: 101,
        requiredPolicy: 'HTS.NationalityManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/city',
        name: '::Menu:Admin:City',
        iconClass: 'fas fa-city',
        parentName: eThemeSharedRouteNames.Administration,
        order: 102,
        requiredPolicy: 'HTS.CityManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/language',
        name: '::Menu:Admin:Language',
        iconClass: 'fas fa-language',
        parentName: eThemeSharedRouteNames.Administration,
        order: 103,
        requiredPolicy: 'HTS.LanguageManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/documentType',
        name: '::Menu:Admin:DocumentType',
        iconClass: 'fas fa-file-alt',
        parentName: eThemeSharedRouteNames.Administration,
        order: 104,
        requiredPolicy: 'HTS.DocumentTypeManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/patientAdmissionMethod',
        name: '::Menu:Admin:PatientAdmissionMethod',
        iconClass: 'fas fa-hospital-user',
        parentName: eThemeSharedRouteNames.Administration,
        order: 105,
        requiredPolicy: 'HTS.PatientAdmissionMethodManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/contractedInstitutionType',
        name: '::Menu:Admin:ContractedInstitutionType',
        iconClass: 'fas fa-clinic-medical',
        parentName: eThemeSharedRouteNames.Administration,
        order: 106,
        requiredPolicy: 'HTS.ContractedInstitutionTypeManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/contractedInstitutionKind',
        name: '::Menu:Admin:ContractedInstitutionKind',
        iconClass: 'fas fa-clinic-medical',
        parentName: eThemeSharedRouteNames.Administration,
        order: 107,
        requiredPolicy: 'HTS.ContractedInstitutionKindManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/contractedInstitution',
        name: '::Menu:Admin:ContractedInstitution',
        iconClass: 'fas fa-clinic-medical',
        parentName: eThemeSharedRouteNames.Administration,
        order: 108,
        requiredPolicy: 'HTS.ContractedInstitutionManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/branch',
        name: '::Menu:Admin:Branch',
        iconClass: 'fas fa-code-branch',
        parentName: eThemeSharedRouteNames.Administration,
        order: 109,
        requiredPolicy: 'HTS.BranchManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/treatmentType',
        name: '::Menu:Admin:TreatmentType',
        iconClass: 'fas fa-list',
        parentName: eThemeSharedRouteNames.Administration,
        order: 110,
        requiredPolicy: 'HTS.TreatmentTypeManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/processKind',
        name: '::Menu:Admin:ProcessKind',
        iconClass: 'fas fa-procedures',
        parentName: eThemeSharedRouteNames.Administration,
        order: 112,
        requiredPolicy: 'HTS.ProcessKindManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/process',
        name: '::Menu:Admin:Process',
        iconClass: 'fas fa-procedures',
        parentName: eThemeSharedRouteNames.Administration,
        order: 112,
        requiredPolicy: 'HTS.ProcessManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/rejectReason',
        name: '::Menu:Admin:RejectReason',
        iconClass: 'fas fa-syringe',
        parentName: eThemeSharedRouteNames.Administration,
        order: 113,
        requiredPolicy: 'HTS.RejectReasonManagement',
        layout: eLayoutType.application
      },
      {
        path: '/admin/paymentReason',
        name: '::Menu:Admin:PaymentReason',
        iconClass: 'fas fa-syringe',
        parentName: eThemeSharedRouteNames.Administration,
        order: 114,
        requiredPolicy: 'HTS.PaymentReasonManagement',
        layout: eLayoutType.application
      },
    ]);
  };
}
