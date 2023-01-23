import { Module } from '@nestjs/common';
import { CategoryOnPostController } from './category-on-post.controller';
import { CategoryOnPostService } from './category-on-post.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryOnPostController],
  providers: [CategoryOnPostService],
  exports: [CategoryOnPostModule],
})
export class CategoryOnPostModule {}
