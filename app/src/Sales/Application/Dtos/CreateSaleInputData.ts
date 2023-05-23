import { DiscountTypesOption } from '../../Domain/Enums/DiscountTypes.types';
import { StatusTypesOptions } from '../../Domain/Enums/StatusTypes.types';

export default class CreateSaleInputData {
  constructor(
    readonly date: Date,
    readonly total_value: number,
    readonly final_value: number,
    readonly customer_id: number,
    readonly user_id: number,
    readonly sale_payment_methods: Array<{
      readonly type: number;
      readonly installment: number;
    }>,
    readonly sale_products: Array<{
      readonly quantity: number;
      readonly discount_amount?: number;
      readonly discount_type?: DiscountTypesOption;
      readonly final_value: number;
      readonly id: number;
    }>,
    readonly observation?: string,
    readonly status?: StatusTypesOptions,
    readonly discount_amount?: number,
    readonly discount_type?: DiscountTypesOption,
  ) {}
}
