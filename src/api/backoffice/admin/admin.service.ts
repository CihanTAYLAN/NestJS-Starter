import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Admin } from '../../../models/admin.entity';
import { AdminUpdateDto } from './dtos/adminUpdate.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { AdminCreateDto } from './dtos/adminCreate.dto';
import { AdminSearchDto } from './dtos/adminSearch.dto';

@Injectable()
export class AdminService {
  @InjectRepository(Admin)
  private readonly repository: Repository<Admin>;

  async getAll(
    options: IPaginationOptions,
    searchBody?: AdminSearchDto,
  ): Promise<Pagination<Admin>> {
    const queryBuilder = this.repository.createQueryBuilder('a');
    queryBuilder.orderBy('a.createdAt', 'DESC');
    if (searchBody) {
      Object.entries(searchBody).map((row) => {
        console.log(row[0]);
        console.log(row[1]);
        queryBuilder.where(`a.${row[0]} like :${row[0]}`, {
          [row[0]]: `%${row[1]}%`,
        });
      });
    }
    return paginate<Admin>(queryBuilder, options);
  }

  public get(rowId: string): Promise<Admin> {
    return this.repository.findOne({ where: { id: rowId } });
  }

  public create(body: AdminCreateDto): Promise<Admin> {
    const admin: Admin = new Admin();
    admin.firstName = body.firstName;
    admin.lastName = body.lastName;
    admin.email = body.email;
    admin.username = body.username;
    admin.password = body.password;
    return this.repository.save(admin);
  }

  public async update(rowId: string, body: AdminUpdateDto): Promise<Admin> {
    const admin: Admin = new Admin();
    admin.firstName = body.firstName ?? admin.firstName;
    admin.lastName = body.lastName ?? admin.lastName;
    admin.email = body.email ?? admin.email;
    admin.username = body.username ?? admin.username;
    admin.password = body.password ?? admin.password;

    const up = await this.repository
      .createQueryBuilder()
      .update(Admin)
      .set(admin)
      .where('id = :id', { id: rowId })
      .execute();
    if (up.affected >= 1) {
      return this.repository.findOne({ where: { id: rowId } });
    }
  }

  public async delete(rowId: string): Promise<DeleteResult> {
    const drop = await this.repository
      .createQueryBuilder()
      .delete()
      .from(Admin)
      .where('id = :id', { id: rowId })
      .execute();
    return drop;
  }
}
