import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryOnPostService } from './category_on_post.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CategoryOnPostDto } from './dto/categoryOnPost.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('category_on_post')
export class CategoryOnPostController {
  constructor(private readonly categoryOnPost: CategoryOnPostService) {}
  //投稿にカテゴリを付与
  @HttpCode(HttpStatus.OK)
  @Post()
  assignCategoryToPost(
    @Req() req: Request,
    @Body() dto: CategoryOnPostDto,
  ): Promise<void> {
    return this.categoryOnPost.assignCategoryToPost(req.user.id, dto);
  }
}
