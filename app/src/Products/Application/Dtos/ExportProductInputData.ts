export default class ExportProductInputData {
  constructor(
    readonly categories_id?: string,
    readonly brands_id?: string,
    readonly initial_value?: number,
    readonly final_value?: number,
  ) {}
}
