import { formatMoneyByCurrencySymbol } from './money';

export const formatDiscount = (
  value: number | null,
  discountType: string | null,
) => {
  if (!value) return null;

  if (discountType === 'percentage') {
    return `${value}%`;
  }

  if (discountType === 'fixed') {
    return formatMoneyByCurrencySymbol(value);
  }

  return null;
};
