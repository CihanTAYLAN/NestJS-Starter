import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { BackofficeController } from './backoffice.controller';

@Module({
  imports: [AdminModule],
  controllers: [BackofficeController],
  providers: [],
})
export class BackofficeModule {}
