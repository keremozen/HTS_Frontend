import { Environment } from '@abp/ng.core';

const baseUrl = 'https://webhts.ushas.com.tr';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Hasta Takip Sistemi',
    logoUrl: 'assets/images/logo/logo-sb1.svg',
  },
  oAuthConfig: {
    issuer: 'https://apihts.ushas.com.tr/',
    redirectUri: baseUrl,
    clientId: 'HTS_App',
    responseType: 'code',
    scope: 'offline_access HTS',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://apihts.ushas.com.tr',
      rootNamespace: 'HTS',
    },
  },
} as Environment;