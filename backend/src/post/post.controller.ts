import {
  Controller,
  Body,
  Delete,
  Get,
  HttpStatus,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { Request } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as UserPost } from '@prisma/client';
import { CategoryDto } from '../category/dto/category.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  //ログインユーザーの全下書きを新しい順に取得
  @UseGuards(AuthGuard('jwt'))
  @Get('draft')
  getDrafts(@Req() req: Request): Promise<UserPost[]> {
    return this.postService.getAllDrafts(req.user.id);
  }

  //ログインユーザーの一つの下書きを取得
  @UseGuards(AuthGuard('jwt'))
  @Get('draft/:id')
  getDraftById(
    @Req() req: Request,
    @Param('id') postId: string,
  ): Promise<UserPost> {
    return this.postService.getDraftById(req.user.id, postId);
  }

  //新規投稿の作成
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPost(
    @Req() req: Request,
    @Body() dto: CreatePostDto,
    // @Body() categoryDto: CategoryDto,
  ): Promise<UserPost> {
    return this.postService.createPost(req.user.id, dto);
  }

  //投稿の編集
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updatePost(
    @Req() req: Request,
    @Param('id') postId: string,
    @Body() dto: UpdatePostDto,
    // @Body() categoryDto: CategoryDto,
  ): Promise<UserPost> {
    return this.postService.updatePost(req.user.id, postId, dto);
  }

  //投稿の削除
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePostById(
    @Req() req: Request,
    @Param('id') postId: string,
  ): Promise<void> {
    return this.postService.deletePostById(req.user.id, postId);
  }

  //一人のユーザーの全投稿を新しい順に取得、認証不要
  @Get(':userId')
  getPosts(@Param('userId') userId: string): Promise<UserPost[]> {
    return this.postService.getAllPosts(userId);
  }

  //一つの投稿を取得、認証不要
  @Get('blog/:postId')
  getPostById(
    @Req() req: Request,
    @Param('postId') postId: string,
  ): Promise<UserPost> {
    return this.postService.getPostById(postId);
  }

  //categoryIdからpostを取得、認証不要
  @Get('categorySearch/:userId/:categoryId')
  getPostsByCategoryId(
    @Param('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ): Promise<any> {
    return this.postService.getPostsByCategoryId(userId, categoryId);
  }

  //categoryIdからpost数を取得
  @Get('getNumber/:userId/:categoryId')
  getNumberOfPostsByCategoryId(
    @Param('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ): Promise<number> {
    return this.postService.getNumberOfPostsByCategoryId(userId, categoryId);
  }
}
