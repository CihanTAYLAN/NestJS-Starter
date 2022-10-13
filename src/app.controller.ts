import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { config } from 'dotenv';
config();

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Redirect(process.env.API_DOC_PATH)
  home(): void {
    //
  }
}
