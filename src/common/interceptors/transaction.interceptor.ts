import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, from, lastValueFrom } from 'rxjs';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { TRANSACTIONAL_KEY } from 'src/common/decorators/transaction.decorator';

@Injectable()
export class TransactionalInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly db: DatabaseService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const isTransactional = this.reflector.get<boolean>(
      TRANSACTIONAL_KEY,
      context.getHandler(),
    );

    if (!isTransactional) {
      return next.handle();
    }

    return from(
      this.db.executeInTransactionRaw(async () => {
        const result: unknown = await lastValueFrom(next.handle());
        return result;
      }),
    );
  }
}
