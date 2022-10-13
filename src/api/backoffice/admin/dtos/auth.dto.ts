import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Admin } from 'src/models/admin.entity';
import { AdminDto } from './admin.dto';

export class AdminAuthdto {
  constructor(admin: Admin, accessToken: string) {
    this.user = new AdminDto(admin);
    this.accessToken = accessToken;
    return this;
  }

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJz...' })
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  user: AdminDto;
}
