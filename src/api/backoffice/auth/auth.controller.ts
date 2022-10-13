import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminAuthdto } from '../admin/dtos/auth.dto';
import { AuthService } from './auth.service';
import { AdminAuthDto } from './dtos/auth.dto';

@ApiTags('Admin auth')
@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('/login')
  @ApiOperation({ operationId: 'Login' })
  async login(@Body() body: AdminAuthDto): Promise<AdminAuthdto> {
    return await this.service.login(body);
  }

  @Post('/forgot_password')
  @ApiOperation({ operationId: 'Forgot password for admin' })
  async forgotPassword(@Body() body: any): Promise<any> {
    return body;
  }

  @Post('/renew_password')
  @ApiOperation({ operationId: 'Renew password for admin' })
  async renewPassword(@Body() body: any): Promise<any> {
    return body;
  }
}
