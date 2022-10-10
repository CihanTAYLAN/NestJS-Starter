import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminDto } from 'src/api/backoffice/admin/dtos/admin.dto';
import { AdminCreateDto } from './admin.dto';
import { AdminService } from './admin.service';
import { AdminUpdateDto } from './dtos/adminUpdate.dto';
import { AdminPaginateDto } from './dtos/adminList.dt';

@ApiTags('Backoffice -> Admin Management')
@Controller()
export class AdminController {
  @Inject(AdminService)
  private readonly service: AdminService;

  @Post()
  async create(@Body() body: AdminCreateDto): Promise<AdminDto> {
    return new AdminDto(await this.service.create(body));
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<AdminPaginateDto> {
    limit = limit > 100 ? 100 : limit;
    const rows = await this.service.getAll({
      page,
      limit,
      route:
        process.env.APP_URL +
        ':' +
        process.env.APP_PORT +
        '/api/backoffice/admin/paginate',
    });
    return new AdminPaginateDto(rows.items, rows.meta, rows?.links);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<AdminDto> {
    return new AdminDto(await this.service.get(id));
  }

  @Put('/:id')
  async update(@Body() body: AdminUpdateDto): Promise<AdminDto> {
    return new AdminDto(await this.service.update(body));
  }

  @Delete('/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<AdminDto> {
    const admin = await this.service.get(id);
    if (admin) {
      const del = await this.service.delete(id);
      if (del.affected > 0) {
        return admin;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException(
      'Record Not Found',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
