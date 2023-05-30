export interface IOrderFilter {
  initial_date?: Date;
  final_date?: Date;
  status?: Array<string>;
  customers_id?: Array<number>;
  users_id?: Array<number>;
}
