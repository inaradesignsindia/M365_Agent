import type { Configuration } from '@azure/msal-browser';

export const getMsalConfig = (): Configuration => {
  const clientId = localStorage.getItem('clientId') || import.meta.env.VITE_CLIENT_ID || 'your-client-id';
  const tenantId = localStorage.getItem('tenantId') || import.meta.env.VITE_TENANT_ID || 'your-tenant-id';

  return {
    auth: {
      clientId,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      redirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
  };
};

export const loginRequest = {
  scopes: ['User.Read', 'User.ReadBasic.All'], // Add more scopes as needed for Graph API
};