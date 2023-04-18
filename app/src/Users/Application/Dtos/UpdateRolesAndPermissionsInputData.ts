export default class UploadRolesAndPermissionsInputData {
  constructor(
    readonly userId: number,
    readonly roles_id: number[],
    readonly permissions_id: number[],
  ) {}
}
