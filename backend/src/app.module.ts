import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { CategoryOnPostModule } from './category_on_post/category_on_post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    PrismaModule,
    CategoryModule,
    CategoryOnPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
