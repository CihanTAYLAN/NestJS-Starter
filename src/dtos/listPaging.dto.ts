import { IsInt, IsNotEmpty } from 'class-validator';

export class PaginateList {
  @IsNotEmpty()
  @IsInt()
  perPage: number;

  @IsNotEmpty()
  @IsInt()
  currentPage: number;

  @IsNotEmpty()
  @IsInt()
  totalPage: number;
}
