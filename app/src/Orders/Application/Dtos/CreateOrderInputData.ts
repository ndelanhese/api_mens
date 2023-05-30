import { StatusTypesOptions } from '@app/src/Shared/Domain/Enums/StatusTypes.types';

export default class CreateOrderInputData {
  constructor(
    readonly date: Date,
    readonly customer_id: number,
    readonly user_id: number,
    readonly order_products?: Array<{
      readonly quantity: number;
      readonly id: number;
    }>,
    readonly observation?: string,
    readonly description?: string,
    readonly status?: StatusTypesOptions,
  ) {}
}
