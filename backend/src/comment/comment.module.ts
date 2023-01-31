import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PostModule } from '../post/post.module';
import { PostService } from '../post/post.service';
import { CategoryModule } from '../category/category.module';
import { CategoryOnPostModule } from '../category_on_post/category_on_post.module';
import { CategoryService } from '../category/category.service';
import { CategoryOnPostService } from '../category_on_post/category_on_post.service';

@Module({
  imports: [PrismaModule, PostModule, CategoryModule, CategoryOnPostModule],
  controllers: [CommentController],
  providers: [
    CommentService,
    PostService,
    CategoryService,
    CategoryOnPostService,
  ],
})
export class CommentModule {}
