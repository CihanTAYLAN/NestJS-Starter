import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Doc')
@Controller()
export class AppController {
  @Get()
  @Redirect('/api')
  @ApiOkResponse({ status: 200, description: 'Redirect to api doc' })
  home(): void {
    //
  }
}
