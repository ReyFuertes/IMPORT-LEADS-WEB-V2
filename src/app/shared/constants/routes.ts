export const LOGINROUTE = '/metaverse/login';
export const CONTRACTSROUTE = '/metaverse/dashboard/contracts';
export const SETTINGSROUTE = '/metaverse/dashboard/users/setting';
export const CHANGEPASSWORDROUTE = '/metaverse/dashboard/users/change-password';
export const PROFILEROUTE = '/metaverse/dashboard/users/profile';
export const USERMNGMNTROUTE = '/metaverse/dashboard/user-management';
export const INSPECTIONSROUTE = '/metaverse/dashboard/inspections';
export const INSPECTIONSRUNTEMPLATEROUTE = '/metaverse/dashboard/inspections/run-template';
export const INSPECTIONSRUNREPORTROUTE = '/metaverse/dashboard/inspections/report';
export const VIEWPERMISSIONROUTE = (id: string) => {
  return `/metaverse/dashboard/view-permission/${id}`;
};
export const NOTFOUNDPAGE = '/metaverse/not-found-page';
