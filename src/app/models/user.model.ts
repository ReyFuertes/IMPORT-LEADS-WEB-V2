export interface IAccess {
  id?: string;
  access_name?: string;
  parent?: IAccess;
  access_route?: string;
}
