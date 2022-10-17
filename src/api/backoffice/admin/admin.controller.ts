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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminDto } from 'src/api/backoffice/admin/dtos/admin.dto';
import { AdminService } from './admin.service';
import { AdminUpdateDto } from './dtos/adminUpdate.dto';
import { AdminPaginateDto } from './dtos/adminList.dto';
import { AdminCreateDto } from './dtos/adminCreate.dto';
import { AdminSearchDto } from './dtos/adminSearch.dto';

@ApiTags('Admin Management')
@ApiBearerAuth('jwtAdminAuth')
@Controller()
export class AdminController {
  @Inject(AdminService)
  private readonly service: AdminService;

  @Post()
  @ApiOperation({ operationId: 'Add admin' })
  async create(@Body() body: AdminCreateDto): Promise<AdminDto> {
    return new AdminDto(await this.service.create(body));
  }

  @Get()
  @ApiOperation({ operationId: 'Get all admins' })
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
        '/api/backoffice/admin',
    });
    return new AdminPaginateDto(rows.items, rows.meta, rows?.links);
  }

  @Post('/search')
  @ApiOperation({ operationId: 'Get all admins with search' })
  async findAllWithSearch(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Body() searchBody: AdminSearchDto,
  ): Promise<AdminPaginateDto> {
    limit = limit > 100 ? 100 : limit;
    const rows = await this.service.getAll(
      {
        page,
        limit,
        route:
          process.env.APP_URL +
          ':' +
          process.env.APP_PORT +
          '/api/backoffice/admin',
      },
      searchBody,
    );
    return new AdminPaginateDto(rows.items, rows.meta, rows?.links);
  }

  @Get('/:rowId')
  @ApiOperation({ operationId: 'Get single admin' })
  async findOne(
    @Param('rowId', ParseUUIDPipe) rowId: string,
  ): Promise<AdminDto> {
    return new AdminDto(await this.service.get(rowId));
  }

  @Put('/:rowId')
  @ApiOperation({ operationId: 'Update admin' })
  async update(
    @Body() body: AdminUpdateDto,
    @Param('rowId', ParseUUIDPipe) rowId: string,
  ): Promise<AdminDto> {
    return new AdminDto(await this.service.update(rowId, body));
  }

  @Delete('/:rowId')
  @ApiOperation({ operationId: 'Delete admin' })
  async delete(
    @Param('rowId', ParseUUIDPipe) rowId: string,
  ): Promise<AdminDto> {
    const admin = await this.service.get(rowId);
    if (admin) {
      const del = await this.service.delete(rowId);
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
