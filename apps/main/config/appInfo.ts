const port = process.env.APP_PORT || 3000

const apiBasePath = '/api/auth/'


export const appInfo = {
  appName: 'Retell',
  apiBasePath: "/api/auth",
  apiDomain: 'https://authz.lifestyle-x.io',
  websiteDomain: window.location.origin,
}