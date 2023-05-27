import { StatusTypesOptions } from '../../Domain/Enums/SaleStatusTypes.types';

export default class UpdateSaleStatusInputData {
  constructor(
    readonly id: number,
    readonly observation: string,
    readonly status: StatusTypesOptions,
  ) {}
}
