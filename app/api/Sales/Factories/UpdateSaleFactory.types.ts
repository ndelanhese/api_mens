import Date from '@app/src/Shared/Infrastructure/Utils/Date';

export interface ISale {
  date: Date;
  total_value: number;
  final_value: number;
  customer: string;
}
