import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BoolResponseDto {
  constructor(status: boolean, message?: string) {
    this.status = status;
    this.message = message;
    return this;
  }

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  status: boolean;

  @IsString()
  @ApiProperty({ example: 'bla bla error.' })
  message?: string;
}
