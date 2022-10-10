import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import DatabaseModule from './database/database.module';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { RouterModule } from '@nestjs/core';
import { BackofficeModule } from './api/backoffice/backoffice.module';
import { AdminModule } from './api/backoffice/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
    ApiModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [
          {
            path: 'backoffice',
            module: BackofficeModule,
            children: [
              {
                path: 'admin',
                module: AdminModule,
              },
            ],
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
