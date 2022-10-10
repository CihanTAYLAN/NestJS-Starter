import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from '../../../models/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    RouterModule.register([
      {
        path: 'admin',
        module: AdminController,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
