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
        path: '/admin/documentType',
        name: '::Menu:Admin:DocumentType',
        iconClass: 'fas fa-file-alt',
        parentName: eThemeSharedRouteNames.Administration,
        order: 103,
        layout: eLayoutType.application
      },
      {
        path: '/admin/patientAdmissionMethod',
        name: '::Menu:Admin:PatientAdmissionMethod',
        iconClass: 'fas fa-hospital-user',
        parentName: eThemeSharedRouteNames.Administration,
        order: 104,
        layout: eLayoutType.application
      },
      {
        path: '/admin/contractedInstitution',
        name: '::Menu:Admin:ContractedInstitution',
        iconClass: 'fas fa-clinic-medical',
        parentName: eThemeSharedRouteNames.Administration,
        order: 105,
        layout: eLayoutType.application
      }
    ]);
  };
}
