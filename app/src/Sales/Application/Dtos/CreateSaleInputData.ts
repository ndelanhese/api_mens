import { DiscountsTypesEnum } from '../../Domain/Enums/DiscountTypes';
import { statusEnum } from '../../Domain/Enums/Status';

export default class CreateSaleInputData {
  constructor(
    readonly date: Date,
    readonly total_value: number,
    readonly final_value: number,
    readonly customer_id: number,
    readonly employee_id: number,
    readonly user_id: number,
    readonly sale_methods: Array<{
      readonly installment: number;
      readonly method_id: number;
    }>,
    readonly sale_products: Array<{
      readonly quantity: number;
      readonly discount_amount?: number;
      readonly discount_type?: DiscountsTypesEnum;
      readonly final_value: number;
      readonly product_id: number;
    }>,
    readonly observation?: string,
    readonly status?: statusEnum,
    readonly discount_amount?: number,
    readonly discount_type?: DiscountsTypesEnum,
  ) {}
}
