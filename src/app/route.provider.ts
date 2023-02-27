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
      }
    ]);
  };
}
