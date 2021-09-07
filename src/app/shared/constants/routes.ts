export const LOGINROUTE = '/login';
export const CONTRACTSROUTE = '/dashboard/contracts';
export const SETTINGSROUTE = '/dashboard/users/setting';
export const CHANGEPASSWORDROUTE = '/dashboard/users/change-password';
export const PROFILEROUTE = '/dashboard/users/profile';
export const USERMNGMNTROUTE = '/dashboard/user-management';
export const INSPECTIONSROUTE = '/dashboard/inspections';
export const INSPECTIONSRUNTEMPLATEROUTE = '/dashboard/inspections/run-template';
export const INSPECTIONSRUNREPORTROUTE = '/dashboard/inspections/report';
export const VIEWPERMISSIONROUTE = (id: string) => {
  return `/dashboard/view-permission/${id}`;
};
export const NOTFOUNDPAGE = '/not-found-page';
