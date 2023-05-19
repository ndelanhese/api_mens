import Date from '@app/src/Shared/Domain/Utils/Date';

export interface ISale {
  date: Date;
  total_value: number;
  final_value: number;
  customer: string;
}
