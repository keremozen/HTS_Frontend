import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Hasta Takip Sistemi',
    logoUrl: 'assets/images/logo/logo-sb1.svg',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44381/',
    redirectUri: baseUrl,
    clientId: 'HTS_App',
    responseType: 'code',
    scope: 'offline_access HTS',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44381',
      rootNamespace: 'HTS',
    },
  },
} as Environment;
