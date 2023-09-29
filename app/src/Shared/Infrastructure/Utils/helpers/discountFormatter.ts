import { formatMoneyByCurrencySymbol } from './money';

export const formatDiscount = (value: number, discountType: string) => {
  if (discountType === 'percentage') {
    return `${value}%`;
  }

  if (discountType === 'fixed') {
    return formatMoneyByCurrencySymbol(value);
  }

  return '';
};
