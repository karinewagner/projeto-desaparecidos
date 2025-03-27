export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao?: string;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
  listaCartaz?: ListaCartaz[];
  ocoId: number;
}

export interface OcorrenciaEntrevDesapDTO {
  informacao?: string;
  vestimentasDesaparecido: string;
}

export interface IMissingPersonByIdResponse {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export interface ListaCartaz {
  urlCartaz: string;
  tipoCartaz: string;
}

export interface IMoreInformation {
  ocoId: 0,
  informacao: string,
  data: string,
  id: 0,
}
