import IBGEService from '@app/src/Extras/Infrastructure/Services/IBGEService';
import { IDistrictResponse } from '@app/src/Extras/Infrastructure/Services/IBGEService.types';
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
      const districts = await ibgeService.getDistricts(state);
      const cities = this.prepareResponse(districts);
      const data = this.returnInData(cities);
      await this.createCache(`cities-of-${state}`, data);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareResponse(city: IDistrictResponse[]) {
    const citiesData = city.map(city => {
      const isMunicipality = city.nome === city.municipio.nome;
      return {
        name: city.nome,
        ...(!isMunicipality && {
          name_with_municipality: `${city.nome} - ${city.municipio.nome}`,
        }),
        is_municipality: isMunicipality,
      };
    });
    return citiesData;
  }
}
