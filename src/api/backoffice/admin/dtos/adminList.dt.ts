import { ApiProperty } from '@nestjs/swagger';
import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { Admin } from 'src/models/admin.entity';
import { AdminDto } from './admin.dto';

export class AdminPaginateDto {
  constructor(items: Admin[], meta: IPaginationMeta, links?: IPaginationLinks) {
    this.items = items.map((row) => {
      return new AdminDto(row);
    });
    this.meta = meta;
    this.links = links;
    return this;
  }

  @ApiProperty({
    type: [AdminDto],
  })
  public items: AdminDto[];

  @ApiProperty({
    example: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
  })
  public meta: IPaginationMeta;

  @ApiProperty({
    example: {
      first: 'string',
      previous: 'string',
      next: 'string',
      last: 'string',
    },
  })
  public links: IPaginationLinks;
}
