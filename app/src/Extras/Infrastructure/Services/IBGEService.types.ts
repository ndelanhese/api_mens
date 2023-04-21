export interface IMunicipalityResponse {
  id: number;
  nome: string;
}

export interface IDistrictResponse {
  id: number;
  nome: string;
  municipio: IMunicipalityResponse;
}
