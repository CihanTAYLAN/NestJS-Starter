import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminUpdateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john_doe@example.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'johndoe123' })
  password: string;
}
