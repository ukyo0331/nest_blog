import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryOnPostDto } from './dto/categoryOnPost.dto';

@Injectable()
export class CategoryOnPostService {
  constructor(private readonly prisma: PrismaService) {}

  //投稿にカテゴリを付与
  async assignCategoryToPost(
    userId: string,
    dto: CategoryOnPostDto,
  ): Promise<void> {
    //postにカテゴリがすでに付与されていれば一旦deleteしてからcreate
    await this.prisma.categoriesOnPosts.deleteMany({
      where: {
        postId: dto.postId,
      },
    });
    // for (let i = 0; i < dto.categoryId.length; i++) {
    //   await this.prisma.categoriesOnPosts.create({
    //     data: {
    //       assignedBy: userId,
    //       postId: dto.postId,
    //       categoryId: dto.categoryId[i],
    //     },
    //   });
    // }
    dto.categoryId.map(async (arg: string) => {
      await this.prisma.categoriesOnPosts.create({
        data: {
          assignedBy: userId,
          postId: dto.postId,
          categoryId: arg,
        },
      });
    });
  }
}
