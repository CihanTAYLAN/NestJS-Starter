import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('BackOffice')
@Controller()
export class BackofficeController {
  @Get()
  @ApiOkResponse({ status: 200, description: 'Dashboard' })
  home(): string {
    return 'slm';
  }
}
