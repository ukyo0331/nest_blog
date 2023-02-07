import { IsNotEmpty, IsNumber } from 'class-validator';

//カテゴリ名での検索に使用するdto
export class CategoryPostDto {
  @IsNumber()
  @IsNotEmpty()
  skip: number;

  @IsNumber()
  @IsNotEmpty()
  take: number;
}
