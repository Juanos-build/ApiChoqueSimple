"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const logger_service_1 = require("./common/helpers/logger.service");
const exception_filter_1 = require("./common/filters/exception.filter");
const response_problem_1 = require("./common/models/response.problem");
const transaction_interceptor_1 = require("./common/interceptors/transaction.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const { json } = await import('express');
    app.use(json());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        exceptionFactory: (errors) => {
            const messages = errors
                .map((e) => Object.values(e.constraints ?? {}).join('|'))
                .join('|');
            const problem = new response_problem_1.ResponseProblem();
            problem.title = 'One or more request errors occurred';
            problem.statusCode = -1;
            problem.statusMessage = messages;
            problem.status = 400;
            return new common_1.BadRequestException(problem);
        },
    }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(), app.get(transaction_interceptor_1.TransactionalInterceptor));
    app.enableCors();
    const logger = app.get(logger_service_1.LoggerService);
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter(logger));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ApiChoqueNest')
        .setDescription('API de gestión de choques')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(3000);
    console.log('Servidor corriendo en http://localhost:3000');
    console.log('Swagger en http://localhost:3000/swagger');
}
void bootstrap();
//# sourceMappingURL=main.js.map