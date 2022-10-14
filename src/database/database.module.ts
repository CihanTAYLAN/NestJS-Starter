import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_DB'),
        autoLoadEntities: configService.get('DATABASE_AUTOLOADENTITIES'),
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
      }),
    }),
  ],
})
class DatabaseModule {}

export default DatabaseModule;
