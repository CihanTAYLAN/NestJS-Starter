import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Admin } from 'src/models/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BackofficeMiddleware implements NestMiddleware {
  private readonly repository: Repository<Admin>;
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const sesUser = this.jwtService.verify(
        req.headers?.authorization?.replace('Bearer ', ''),
      );
      if (sesUser) {
        next();
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
