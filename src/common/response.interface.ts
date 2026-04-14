export interface Response<T> {
  statusCode: number;
  statusMessage: string;
  result?: T;
}
