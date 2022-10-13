import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../../models/admin.entity';
import { AdminAuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthdto } from '../admin/dtos/auth.dto';

@Injectable()
export class AuthService {
  @InjectRepository(Admin)
  private readonly repository: Repository<Admin>;
  constructor(private jwtService: JwtService) {}

  public async login(@Body() body: AdminAuthDto): Promise<AdminAuthdto> {
    const user = await this.repository.findOne({
      where: { username: body.username },
    });
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (isMatch) {
      return new AdminAuthdto(user, this.jwtService.sign({ user: user }));
    }
    throw new HttpException(
      'wrong username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
