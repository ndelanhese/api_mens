import BrasilApiService from '@app/src/Extras/Infrastructure/Services/BrasilApiService';
import { validateCpf as cpfValidate } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { validatePisPasep as pisPasepValidate } from '@app/src/Shared/Infrastructure/Utils/PisPasep';
import HttpError from '@exceptions/HttpError';

export default class EmployeeAction {
  protected async validateCep(cep?: string) {
    if (!cep) {
      throw new HttpError(404, 'CEP inválido');
    }
    const brasilApiService = new BrasilApiService();
    const hasCep = await brasilApiService.getAddressByCep(cep);
    if (!hasCep) {
      throw new HttpError(404, 'CEP inválido');
    }
    return;
  }

  protected validatePisPasep(pis_pasep?: string) {
    if (!pis_pasep) {
      throw new HttpError(404, 'PIS PASEP inválido');
    }
    const isValidPisPasep = pisPasepValidate(pis_pasep);
    if (!isValidPisPasep) {
      throw new HttpError(404, 'PIS PASEP inválido');
    }
    return;
  }

  protected validateCpf(cpf: string) {
    if (!cpfValidate(cpf)) {
      throw new HttpError(400, 'CPF invalido');
    }
    return;
  }

  protected validateDate(date: Date) {
    const currentDate = getDate();
    if (date >= currentDate) {
      throw new HttpError(400, 'Data de nascimento invalida');
    }
    return;
  }

  protected validateAdmissionDate(date: Date) {
    const currentDate = getDate();
    if (date >= currentDate) {
      throw new HttpError(400, 'Data de contratação invalida');
    }
    return;
  }

  protected validateResignationDate(date?: Date) {
    if (!date) return;
    const currentDate = getDate();
    if (date >= currentDate) {
      throw new HttpError(400, 'Data de demissão invalida');
    }
    return;
  }

  protected validatePhone(phone: string) {
    const ONLY_NUMBERS_REGEX = /^\d+$/;
    const isOnlyNumbers = ONLY_NUMBERS_REGEX.test(phone);
    if (!isOnlyNumbers) {
      throw new HttpError(400, 'Telefone invalido');
    }
    return;
  }
}
