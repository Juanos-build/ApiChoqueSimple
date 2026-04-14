import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import { DatabaseService } from './database.service';
import { TransactionService } from '../dao/transaction.service';
import { DaoContainer } from './dao.container';
import { TransactionalInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { DAO_PROVIDERS } from './dao.provider';

// @Global() — equivale a AddSingleton — disponible en TODA la app
// sin necesidad de importarlo en cada módulo
@Global()
@Module({
  imports: [
    // Carga la config de BD como namespace — equivale a IOptions<DatabaseConfig>
    ConfigModule.forFeature(databaseConfig),
  ],
  providers: [
    // Equivale a services.AddSingleton<IConnectionFactory, ConnectionFactory>()
    DatabaseService,
    // Equivale a services.AddScoped<ITransactionDao, TransactionDao>()
    TransactionService,
    TransactionalInterceptor,
    DaoContainer,
    ...DAO_PROVIDERS,
  ],
  // exports — hace que DatabaseService y TransactionService
  // estén disponibles en cualquier módulo sin re-importar
  // Equivale a que el DI container de .NET los resuelva automáticamente
  exports: [DatabaseService, TransactionService],
})
export class DatabaseModule {}
