export default class UpdateUserInputData {
  constructor(
    readonly id: number,
    readonly user?: string,
    readonly email?: string,
    readonly password?: string,
    readonly status?: string,
    readonly employee_id?: number,
  ) {}
}
