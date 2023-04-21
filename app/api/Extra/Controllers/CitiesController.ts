import IBGEService from '@app/src/Extras/Infrastructure/Services/IBGEService';
import {
  IDistrictResponse,
  IMunicipalityResponse,
} from '@app/src/Extras/Infrastructure/Services/IBGEService.types';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

export default class StatesController extends BaseController {
  public async getCities(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const state = String(req.query.uf);
      const cache = await this.getCache(`cities-of-${state}`);
      if (cache) {
        return res.status(200).json(cache);
      }
      const ibgeService = new IBGEService();
      const municipality = await ibgeService.getMunicipalities(state);
      const districts = await ibgeService.getDistricts(state);
      const cities = this.prepareResponse(municipality, districts);
      await this.createCache(`cities-of-${state}`, cities);
      return res.status(200).json(cities);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareResponse(
    municipalities: IMunicipalityResponse[],
    districts: IDistrictResponse[],
  ) {
    const municipalityData = municipalities.map(municipality => ({
      name: municipality.nome,
      isMunicipality: true,
    }));
    const districtsData = districts.map(district => ({
      name: district.nome,
      name_with_municipality: `${district.nome} - ${district.municipio.nome}`,
      isMunicipality: false,
    }));
    return municipalityData.concat(districtsData);
  }
}
