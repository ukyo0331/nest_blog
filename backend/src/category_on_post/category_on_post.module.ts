import { Module } from '@nestjs/common';
import { CategoryOnPostController } from './category_on_post.controller';
import { CategoryOnPostService } from './category_on_post.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryOnPostController],
  providers: [CategoryOnPostService],
  exports: [CategoryOnPostModule],
})
export class CategoryOnPostModule {}
