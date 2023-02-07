import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { CreatePostDto } from '../post/dto/create-post.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  //カテゴリーの作成
  async createCategory(userId: string, dto: CreatePostDto): Promise<string[]> {
    //カテゴリを配列に変換して、重複を削除する
    const splitCategory = Array.from(new Set(dto.name.split(/[,\s]+/))).filter(
      (s) => s.trim() !== '',
    );
    const categoryArg = [];
    for (let i = 0; i < splitCategory.length; i++) {
      const postCategory = await this.prisma.category.findFirst({
        where: {
          userId,
          name: splitCategory[i],
        },
      });
      if (!postCategory) {
        const createCategory = await this.prisma.category.create({
          data: {
            userId,
            name: splitCategory[i],
          },
        });
        categoryArg.push(createCategory.id);
      } else {
        categoryArg.push(postCategory.id);
      }
    }
    return categoryArg;
  }
  //カテゴリー一覧の取得
  async getCategory(userId: string): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
      include: {
        posts: {
          where: {
            post: {
              status: 'published',
            },
          },
          include: {
            post: true,
          },
        },
      },
    });
  }
  //categoryIdからカテゴリnameを取得
  async getCategoryById(categoryId: string): Promise<string> {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return category.name;
  }
  //特定カテゴリーに含まれるpost数の取得
}
