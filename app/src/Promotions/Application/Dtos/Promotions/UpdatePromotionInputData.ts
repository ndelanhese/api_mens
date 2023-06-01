import { StatusTypesOptions } from '@app/src/Shared/Domain/Enums/StatusTypes.types';

import { PromotionStatusTypes } from '../../../Domain/Enums/PromotionStatusTypes';

export default class UpdatePromotionInputData {
  constructor(
    readonly id: number,
    readonly name?: string,
    readonly description?: string,
    readonly initial_date?: Date,
    readonly final_date?: Date,
    readonly promotion_category_id?: number,
    readonly sale_products?: Array<{
      readonly id: number;
    }>,
    readonly status?: StatusTypesOptions,
    readonly discount_amount?: number,
    readonly discount_type?: PromotionStatusTypes,
  ) {}
}
