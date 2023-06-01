import { PromotionStatusTypesOptions } from '@app/src/Promotions/Domain/Enums/PromotionStatusTypes.types';
import { StatusTypesOptions } from '@app/src/Shared/Domain/Enums/StatusTypes.types';

export default class CreatePromotionInputData {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly initial_date: Date,
    readonly final_date: Date,
    readonly promotion_category_id: number,
    readonly promotion_products: Array<{
      readonly id: number;
    }>,
    readonly status?: StatusTypesOptions,
    readonly discount_amount?: number,
    readonly discount_type?: PromotionStatusTypesOptions,
  ) {}
}
