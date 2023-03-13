export default class UpdateUserInputData {
  constructor(
    readonly id: number,
    readonly first_name?: string,
    readonly last_name?: string,
    readonly phone?: string,
    readonly email?: string,
    readonly password?: string,
    readonly status?: string,
  ) {}
}
