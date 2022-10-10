import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Admin } from 'src/models/admin.entity';

export class AdminDto {
  constructor(admin: Admin) {
    this.id = admin.id;
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email = admin.email;
    this.createdAt = admin.createdAt;
    return this;
  }

  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', type: 'string' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', type: 'string' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john_doe@example.com', type: 'string' })
  email: string;

  @IsNotEmpty()
  @IsString()
  createdAt: Date;
}
