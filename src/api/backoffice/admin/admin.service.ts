import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AdminCreateDto } from './admin.dto';
import { Admin } from '../../../models/admin.entity';
import { AdminUpdateDto } from './dtos/adminUpdate.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { AdminDto } from './dtos/admin.dto';

@Injectable()
export class AdminService {
  @InjectRepository(Admin)
  private readonly repository: Repository<Admin>;

  async getAll(options: IPaginationOptions): Promise<Pagination<Admin>> {
    const queryBuilder = this.repository.createQueryBuilder('a');
    queryBuilder.orderBy('a.createdAt', 'DESC');
    return paginate<Admin>(queryBuilder, options);
  }

  public get(id: string): Promise<Admin> {
    return this.repository.findOne({ where: { id: id } });
  }

  public create(body: AdminCreateDto): Promise<Admin> {
    const admin: Admin = new Admin();
    admin.firstName = body.firstName;
    admin.lastName = body.lastName;
    admin.email = body.email;
    admin.password = body.password;
    return this.repository.save(admin);
  }

  public async update(body: AdminUpdateDto): Promise<Admin> {
    const admin: Admin = new Admin();
    admin.firstName = body.firstName ?? admin.firstName;
    admin.lastName = body.lastName ?? admin.lastName;
    admin.email = body.email ?? admin.email;
    admin.password = body.password ?? admin.password;

    const up = await this.repository
      .createQueryBuilder()
      .update(Admin)
      .set(admin)
      .where('id = :id', { id: body.id })
      .execute();
    if (up.affected >= 1) {
      return this.repository.findOne({ where: { id: body.id } });
    }
  }

  public async delete(id: string): Promise<DeleteResult> {
    const drop = await this.repository
      .createQueryBuilder()
      .delete()
      .from(Admin)
      .where('id = :id', { id: id })
      .execute();
    return drop;
  }
}
