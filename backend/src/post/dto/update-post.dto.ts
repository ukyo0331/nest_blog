import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  status: 'draft' | 'published';

  @IsString()
  @IsNotEmpty()
  name: string;
}
