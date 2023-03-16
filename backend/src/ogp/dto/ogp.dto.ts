import { IsNotEmpty, IsString } from 'class-validator';

export class GetOgpDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateOgpDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  postId: string;
}
