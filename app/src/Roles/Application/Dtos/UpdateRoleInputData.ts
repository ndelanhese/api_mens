export default class UpdateRoleInputData {
  constructor(
    readonly id: number,
    readonly name?: string,
    readonly description?: string,
    readonly permissions?: number[],
  ) {}
}
