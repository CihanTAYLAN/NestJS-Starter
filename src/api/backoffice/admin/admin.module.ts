import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from '../../../models/admin.entity';
import { BackofficeMiddleware } from '../backoffice.middleware';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BackofficeMiddleware).forRoutes(AdminController);
  }
}
