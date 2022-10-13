import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { BackofficeController } from './backoffice.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, AdminModule],
  controllers: [BackofficeController],
  providers: [],
})
export class BackofficeModule {}
