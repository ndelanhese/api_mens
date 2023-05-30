import { StatusTypesOptions } from '@app/src/Shared/Domain/Enums/StatusTypes.types';

export default class UpdateOrderStatusInputData {
  constructor(
    readonly id: number,
    readonly observation: string,
    readonly status: StatusTypesOptions,
  ) {}
}
