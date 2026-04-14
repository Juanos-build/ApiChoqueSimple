import { Injectable } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import { join } from 'path';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    const logFolder = process.env.LOG_FOLDER ?? 'logs';
    const logName = process.env.LOG_NAME ?? 'app';
    const date = new Date().toISOString().split('T')[0];
    const basePath = join(logFolder, date);

    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.json(), // equivale a JsonLayout en NLog
      ),
      transports: [
        // Equivale a tu target "console"
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        // Equivale a tu target "errorFile"
        new transports.File({
          filename: join(basePath, `${logName}_error.log`),
          level: 'error',
        }),
        // Equivale a tu target "successFile"
        new transports.File({
          filename: join(basePath, `${logName}_success.log`),
          level: 'info',
        }),
      ],
    });
  }

  // Equivale a LoggerManager.logger.WithProperty(...).Error(message)
  error(message: string, properties?: Record<string, unknown>): void {
    this.logger.error(message, { eventType: 'Error', ...properties });
  }

  info(message: string, properties?: Record<string, unknown>): void {
    this.logger.info(message, { eventType: 'Info', ...properties });
  }

  warn(message: string, properties?: Record<string, unknown>): void {
    this.logger.warn(message, { eventType: 'BusinessError', ...properties });
  }
}
