import { StatusTypesOptions } from '../../Domain/Enums/StatusTypes.types';

export default class ExportSalesInputData {
  constructor(
    readonly initial_date?: Date,
    readonly final_date?: Date,
    readonly status?: Array<StatusTypesOptions>,
    readonly customers_id?: Array<number>,
    readonly users_id?: Array<number>,
    readonly products_ids?: Array<number>,
    readonly suppliers_ids?: Array<number>,
  ) {}
  //TODO -> Verificar possíveis novos filtros
}
