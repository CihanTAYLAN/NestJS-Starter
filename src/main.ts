import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { StoplightElementsModule } from 'nestjs-stoplight-elements';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(
    [process.env.API_DOC_PATH, process.env.API_DOC_PATH + '-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.API_DOC_USER]: process.env.API_DOC_PASS,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_TITLE + ' Api Doc')
    .setDescription(process.env.APP_DESCRIPTION)
    .setVersion(process.env.APP_VERSION)
    .setContact(
      process.env.APP_NAME,
      process.env.CONTACT_URL,
      process.env.CONTACT_EMAIL,
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwtAdminAuth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('swagger-docs', app, document);
  const StoplightElements = new StoplightElementsModule(app, document, {
    layout: 'sidebar',
    router: 'hash',
    logo: 'https://inity.com.tr/assets/images/web/logo4.png',
    basePath: process.env.API_DOC_PATH,
  });
  await StoplightElements.start(process.env.API_DOC_PATH);

  //   const redocOptions: RedocOptions = {
  //     title: process.env.APP_NAME + ' Api Doc',
  //     logo: {
  //       url: 'https://inity.com.tr/assets/images/web/logo4.png',
  //       backgroundColor: '#fff',
  //       altText: process.env.APP_TITLE,
  //     },
  //     sortPropsAlphabetically: true,
  //     hideDownloadButton: false,
  //     hideHostname: false,
  //     auth: {
  //       enabled: true,
  //       user: process.env.API_DOC_USER,
  //       password: process.env.API_DOC_PASS,
  //     },
  //   };
  //   // Instead of using SwaggerModule.setup() you call this module
  //   await RedocModule.setup('/redoc-docs', app, document, redocOptions);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
