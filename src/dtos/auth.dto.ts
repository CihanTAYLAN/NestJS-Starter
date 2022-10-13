import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'johndoe123' })
  password: string;
}
