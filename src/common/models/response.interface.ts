export interface Response<T> {
  statusCode: number;
  statusMessage: string;
  result?: T;
}

export interface Request<T> {
  data: T;
  idAplicacion: number;
  idVersion: number;
  language: string;
  platform: string;
  version: string;
}

export interface DbResult<T> {
  statusCode: number;
  statusMessage: string;
  data?: T;
}
