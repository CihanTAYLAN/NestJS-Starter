import { IsNotEmpty, IsString } from 'class-validator';

export class ValidationError {
  constructor(message: string) {
    this.message = message;
    return this;
  }

  @IsNotEmpty()
  @IsString()
  message: string;
}
