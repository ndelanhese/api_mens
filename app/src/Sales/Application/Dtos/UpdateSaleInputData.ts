import { StatusTypesOptions } from '@app/src/Shared/Domain/Enums/StatusTypes.types';

import { DiscountTypesOption } from '../../Domain/Enums/DiscountTypes.types';

export default class UpdateSaleInputData {
  constructor(
    readonly id: number,
    readonly total_value?: number,
    readonly final_value?: number,
    readonly customer_id?: number,
    readonly user_id?: number,
    readonly sale_payment_methods?: Array<{
      readonly installment: number;
      readonly type: number;
    }>,
    readonly sale_products?: Array<{
      readonly quantity: number;
      readonly id: number;
    }>,
    readonly observation?: string,
    readonly status?: StatusTypesOptions,
    readonly discount_amount?: number,
    readonly discount_type?: DiscountTypesOption,
  ) {}
}
