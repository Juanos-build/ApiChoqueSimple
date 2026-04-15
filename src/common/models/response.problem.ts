export class ResponseProblem {
  title: string;
  statusCode: number;
  statusMessage: string;
  detail?: string;
  status?: number;

  bad(result?: {
    statusCode?: number;
    statusMessage?: string;
  }): ResponseProblem {
    this.statusCode = result?.statusCode ?? -1;
    this.statusMessage = result?.statusMessage ?? 'Error';
    return this;
  }
}
