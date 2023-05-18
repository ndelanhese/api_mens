export default class ExportSalesInputData {
  constructor(
    readonly initial_date?: string,
    readonly final_date?: string,
    readonly status?: string,
    readonly customers_id?: string,
    readonly users_id?: string,
    readonly products_ids?: string,
    readonly suppliers_ids?: string,
  ) {}
  //TODO -> Verificar possíveis novos filtros
}
