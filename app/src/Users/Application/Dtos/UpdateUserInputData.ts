export default class UpdateUserInputData {
  constructor(
    readonly id: number,
    readonly current_password: string,
    readonly user?: string,
    readonly email?: string,
    readonly password?: string,
    readonly status?: string,
    readonly employee_id?: number,
  ) {}
}
