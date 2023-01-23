import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CategoryDto } from './dto/category.dto';
import { Category } from '@prisma/client';
import { CreatePostDto } from '../post/dto/create-post.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  //カテゴリー作成
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post()
  createCategory(
    @Req() req: Request,
    @Body() dto: CreatePostDto,
  ): Promise<string[]> {
    return this.categoryService.createCategory(req.user.id, dto);
  }
  //カテゴリー一覧の取得
  @Get(':userId')
  getCategory(@Param('userId') userId: string): Promise<Category[]> {
    return this.categoryService.getCategory(userId);
  }
  //categoryIdからカテゴリnameを取得
  @Get('category/:categoryId')
  getCategoryById(@Param('categoryId') categoryId: string): Promise<string> {
    return this.categoryService.getCategoryById(categoryId);
  }
}
