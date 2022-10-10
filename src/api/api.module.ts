import { Module } from '@nestjs/common';
import { AdminModule } from './backoffice/admin/admin.module';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [BackofficeModule, AdminModule],
  controllers: [],
})
export class ApiModule {}
