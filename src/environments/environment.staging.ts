import { Environment } from '@abp/ng.core';

const baseUrl = 'https://webhtstest.ushas.com.tr';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Hasta Takip Sistemi',
    logoUrl: 'assets/images/logo/logo-sb1.svg',
  },
  oAuthConfig: {
    issuer: 'https://apihtstest.ushas.com.tr:44381/',
    redirectUri: baseUrl,
    clientId: 'HTS_App',
    responseType: 'code',
    scope: 'offline_access HTS',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://apihtstest.ushas.com.tr:44381',
      rootNamespace: 'HTS',
    },
  },
} as Environment;
