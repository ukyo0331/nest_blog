import { IsNotEmpty, IsNumber } from 'class-validator';

export class QueryPostDto {
  @IsNumber()
  @IsNotEmpty()
  skip: number;

  @IsNumber()
  @IsNotEmpty()
  take: number;
}
