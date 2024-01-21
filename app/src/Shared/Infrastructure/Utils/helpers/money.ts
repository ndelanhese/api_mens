/**
 * Format money with currency symbol
 */

export function formatMoneyByCurrencySymbol(
  value: number | undefined,
  currency: string | undefined = 'BRL',
  locale: 'pt-BR' | 'en-US' | undefined = 'pt-BR',
) {
  if (value === 0) return 'R$ 0,00';
  if (!value) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}
