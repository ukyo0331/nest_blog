import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CategoryOnPostDto {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsArray()
  @IsNotEmpty()
  categoryId: string[];
}
