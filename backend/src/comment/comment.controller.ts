import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Comment } from '@prisma/client';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  //ログインユーザーに寄せられたコメントの一覧を取得
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllComments(@Req() req: Request): Promise<Comment[]> {
    return this.commentService.getAllComments(req.user.id);
  }
  //コメントの作成
  @Post(':postId')
  createComment(
    @Param('postId') postId: string,
    @Body() dto: CommentDto,
  ): Promise<Comment> {
    return this.commentService.createComment(postId, dto);
  }
  //コメントの削除
  @UseGuards(AuthGuard('jwt'))
  @Delete(':commentId')
  deleteCommentById(
    @Req() req: Request,
    @Param('commentId') commentId: string,
  ): Promise<void> {
    return this.commentService.deleteCommentById(req.user.id, commentId);
  }
}
