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
        path: '/admin/hospital',
        name: '::Menu:Admin:Hospital',
        iconClass: 'fas fa-h-square',
        parentName: eThemeSharedRouteNames.Administration,
        order: 100,
        layout: eLayoutType.application
      },
      {
        path: '/admin/nationality',
        name: '::Menu:Admin:Nationality',
        iconClass: 'fas fa-passport',
        parentName: eThemeSharedRouteNames.Administration,
        order: 101,
        layout: eLayoutType.application
      },
      {
        path: '/admin/language',
        name: '::Menu:Admin:Language',
        iconClass: 'fas fa-language',
        parentName: eThemeSharedRouteNames.Administration,
        order: 102,
        layout: eLayoutType.application
      },
      {
        path: '/admin/patientNoteStatus',
        name: '::Menu:Admin:PatientNoteStatus',
        iconClass: 'fas fa-notes-medical',
        parentName: eThemeSharedRouteNames.Administration,
        order: 103,
        layout: eLayoutType.application
      },
      {
        path: '/admin/documentType',
        name: '::Menu:Admin:DocumentType',
        iconClass: 'fas fa-file-alt',
        parentName: eThemeSharedRouteNames.Administration,
        order: 104,
        layout: eLayoutType.application
      },
      {
        path: '/admin/patientDocumentStatus',
        name: '::Menu:Admin:PatientDocumentStatus',
        iconClass: 'fas fa-notes-medical',
        parentName: eThemeSharedRouteNames.Administration,
        order: 105,
        layout: eLayoutType.application
      },
      {
        path: '/admin/treatmentProcessStatus',
        name: '::Menu:Admin:TreatmentProcessStatus',
        iconClass: 'fas fa-prescription-bottle-alt',
        parentName: eThemeSharedRouteNames.Administration,
        order: 106,
        layout: eLayoutType.application
      },
      {
        path: '/admin/patientAdmissionMethod',
        name: '::Menu:Admin:PatientAdmissionMethod',
        iconClass: 'fas fa-hospital-user',
        parentName: eThemeSharedRouteNames.Administration,
        order: 107,
        layout: eLayoutType.application
      },
      {
        path: '/admin/contractedInstitution',
        name: '::Menu:Admin:ContractedInstitution',
        iconClass: 'fas fa-clinic-medical',
        parentName: eThemeSharedRouteNames.Administration,
        order: 107,
        layout: eLayoutType.application
      },
      {
        path: '/admin/hospitalConsultationStatus',
        name: '::Menu:Admin:HospitalConsultationStatus',
        iconClass: 'fas fa-comment-medical',
        parentName: eThemeSharedRouteNames.Administration,
        order: 108,
        layout: eLayoutType.application
      }
    ]);
  };
}
