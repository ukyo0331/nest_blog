import { IsNotEmpty, IsString } from 'class-validator';

export class OgpDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
