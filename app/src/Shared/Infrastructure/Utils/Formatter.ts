export const removeMask = (cnpj: string) => cnpj.replace(/\D+/g, '');

export const formatRG = (rg: string): string => {
  if (!rg || rg.length < 8) {
    return rg;
  }
  return rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
};

export const formatPisPasep = (pis: string): string => {
  const pisLength = pis.length;
  if (pisLength < 2) {
    return pis;
  }
  if (pisLength <= 10) {
    return pis.replace(/(\d{1,3})(\d{1,5})(\d{1,2})/, '$1.$2.$3');
  }
  return pis.replace(/(\d{1,3})(\d{1,5})(\d{1,2})(\d{1})/, '$1.$2.$3-$4');
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 2) {
    return phoneNumber;
  }
  if (phoneNumberLength <= 10) {
    return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phoneNumber.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4');
};

export const formatPostaCode = (postalCode: string | undefined): string => {
  if (!postalCode) return '';

  const postaCodeLength = postalCode.length;
  if (postaCodeLength < 2) {
    return postalCode;
  }

  if (postaCodeLength <= 8) {
    return postalCode.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  return postalCode;
};
