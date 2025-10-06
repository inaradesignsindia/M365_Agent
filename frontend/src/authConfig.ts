import type { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'your-client-id', // Replace with your Azure AD app registration client ID
    authority: 'https://login.microsoftonline.com/your-tenant-id', // Replace with your tenant ID
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['User.Read', 'User.ReadBasic.All'], // Add more scopes as needed for Graph API
};