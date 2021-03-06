import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, LogLevel } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './api.module';

export default class Api {
  private readonly logger = new Logger(Api.name);

  async bootstrap(): Promise<void> {
    const logger = [...(process.env.LOG_LEVELS.split(',') as LogLevel[])];
    const app = await NestFactory.create(AppModule, {
      logger,
    });
    app.enableCors();
    app.setGlobalPrefix('/api/v1/:contractId', {
      exclude: ['/api/v1/contracts', '/api/v1/market/([^\\s]+)'],
    });

    if (process.env.NODE_ENV === 'development') {
      (app as any).httpAdapter.instance.set('json spaces', 2);
    }

    const config = new DocumentBuilder()
      .setTitle('Astro Stats API')
      .setDescription('Astro Stats API Backend Server')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    const configService: ConfigService = app.get(ConfigService);

    const port = configService.get<number>('api.port');

    await app.listen(port, () =>
      this.logger.log('API Service is listening...'),
    );
  }
}
