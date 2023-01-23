import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
import { Comment } from '@prisma/client';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postService: PostService,
  ) {}
  //ログインユーザーに寄せられたコメントの一覧を取得
  getAllComments(userId: string): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  //コメントの作成
  async createComment(postId: string, dto: CommentDto): Promise<Comment> {
    const post = await this.postService.getPostById(postId);
    if (!post) throw new ForbiddenException('Post not found');
    const comment = this.prisma.comment.create({
      data: {
        userId: post.userId,
        postId,
        ...dto,
      },
    });
    return comment;
  }
  //コメントの削除
  async deleteCommentById(userId: string, commentId: string): Promise<void> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment || comment.userId !== userId)
      throw new ForbiddenException('No permission to delete');
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
