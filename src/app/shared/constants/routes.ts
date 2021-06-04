export const LOGINROUTE = '/cilchina/login';
export const CONTRACTSROUTE = '/cilchina/dashboard/contracts';
export const SETTINGSROUTE = '/cilchina/dashboard/users/setting';
export const CHANGEPASSWORDROUTE = '/cilchina/dashboard/users/change-password';
export const PROFILEROUTE = '/cilchina/dashboard/users/profile';
export const USERMNGMNTROUTE = '/cilchina/dashboard/user-management';
export const INSPECTIONSROUTE = '/cilchina/dashboard/inspections';
export const INSPECTIONSRUNTEMPLATEROUTE = '/cilchina/dashboard/inspections/run-template';
export const INSPECTIONSRUNREPORTROUTE = '/cilchina/dashboard/inspections/report';
export const VIEWPERMISSIONROUTE = (id: string) => {
  return `/cilchina/dashboard/view-permission/${id}`;
};
export const NOTFOUNDPAGE = '/cilchina/not-found-page';
