export const LOGINROUTE = '/iaad/login';
export const CONTRACTSROUTE = '/iaad/dashboard/contracts';
export const SETTINGSROUTE = '/iaad/dashboard/users/setting';
export const CHANGEPASSWORDROUTE = '/iaad/dashboard/users/change-password';
export const PROFILEROUTE = '/iaad/dashboard/users/profile';
export const USERMNGMNTROUTE = '/iaad/dashboard/user-management';
export const INSPECTIONSROUTE = '/iaad/dashboard/inspections';
export const INSPECTIONSRUNTEMPLATEROUTE = '/iaad/dashboard/inspections/run-template';
export const INSPECTIONSRUNREPORTROUTE = '/iaad/dashboard/inspections/report';
export const VIEWPERMISSIONROUTE = (id: string) => {
  return `/iaad/dashboard/view-permission/${id}`;
};
export const NOTFOUNDPAGE = '/iaad/not-found-page';
