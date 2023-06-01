export default class UpdatePromotionDateInputData {
  constructor(
    readonly id: number,
    readonly start_date?: Date,
    readonly final_date?: Date,
  ) {}
}
