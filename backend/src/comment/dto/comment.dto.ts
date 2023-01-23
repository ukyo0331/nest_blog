import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(512)
  desc: string;
}
