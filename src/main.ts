import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { HttpExceptionFilters } from './exception-filters/exception-filters.spec';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //useing http exception filters globally
  //  app.useGlobalFilters(new HttpExceptionFilters());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
