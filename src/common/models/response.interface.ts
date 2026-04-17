export interface AppResponse<T> {
  statusCode: number;
  statusMessage: string;
  result?: T;
}

export interface AppRequest<T> {
  data: T;
  idAplicacion?: number;
  idVersion?: number;
  language?: string;
  platform?: string;
  version?: string;
}

export interface DbResult<T> {
  statusCode: number;
  statusMessage: string;
  data?: T;
}

export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
}

import { Request as ExpressRequest } from 'express';

export interface RequestWithUser extends ExpressRequest {
  user?: AuthUser;
}
