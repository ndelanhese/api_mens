export default class CreateRoleInputData {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly permissions: number[],
  ) {}
}
