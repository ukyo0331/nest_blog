import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';
import { CategoryService } from '../category/category.service';
import { CategoryOnPostService } from '../category_on_post/category_on_post.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService,
    private readonly categoryOnPostService: CategoryOnPostService,
  ) {}
  //ログインユーザーの全下書きを新しい順に取得
  getAllDrafts(userId: string, skip: number, take: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId,
        status: 'draft',
      },
      //pagination
      skip,
      take,
      //createdAtの新しい順にソート
      orderBy: {
        createdAt: 'desc',
      },
      //検索結果にcategoriesを含める
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }
  //一つの下書きを取得
  async getDraftById(userId: string, postId: string): Promise<Post> {
    const post = await this.prisma.post.findFirst({
      where: {
        userId,
        id: postId,
        status: 'draft',
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    return post;
  }
  //新規投稿の作成（カテゴリー込み
  //create, connectを使用してもっとスッキリとした記述に修正すること
  async createPost(
    userId: string,
    dto: CreatePostDto,
    // categoryDto: CategoryDto,
  ): Promise<Post> {
    const categoryArg = await this.categoryService.createCategory(userId, dto);
    const post = await this.prisma.post.create({
      data: {
        userId,
        title: dto.title,
        desc: dto.desc,
        status: dto.status,
        image: dto.image,
      },
    });
    const categoryOnPostDto = {
      postId: post.id,
      categoryId: categoryArg,
    };
    await this.categoryOnPostService.assignCategoryToPost(
      userId,
      categoryOnPostDto,
    );
    return post;
  }
  //投稿の編集
  async updatePost(
    userId: string,
    postId: string,
    dto: UpdatePostDto,
    // categoryDto: CategoryDto,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post || post.userId !== userId)
      throw new ForbiddenException('No permission to update');
    const categoryArg = await this.categoryService.createCategory(userId, dto);
    const updatedPost = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        userId,
        title: dto.title,
        desc: dto.desc,
        status: dto.status,
        image: dto.image,
      },
    });
    const categoryOnPostDto = {
      postId: post.id,
      categoryId: categoryArg,
    };
    await this.categoryOnPostService.assignCategoryToPost(
      userId,
      categoryOnPostDto,
    );
    return updatedPost;
  }
  //投稿の削除
  async deletePostById(userId: string, postId: string): Promise<void> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post || post.userId !== userId)
      throw new ForbiddenException('No permission to delete');
    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
  //一人のユーザーの全投稿を新しい順に取得、認証不要
  getAllPosts(userId: string, skip: number, take: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId,
        status: 'published',
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }
  //一つの投稿を取得、認証不要
  getPostById(postId: string): Promise<Post> {
    return this.prisma.post.findFirst({
      where: {
        id: postId,
        status: 'published',
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }
  //カテゴリ名からpostを取得（カテゴリ検索）
  getPostsByCategoryName(
    userId: string,
    categoryName: string,
    skip: number,
    take: number,
  ): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId,
        status: 'published',
        categories: {
          some: {
            category: {
              name: {
                contains: categoryName,
              },
            },
          },
        },
      },
      skip,
      take,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  //categoryIdからpostを取得
  getPostsByCategoryId(userId: string, categoryId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId: userId,
        status: 'published',
        categories: {
          some: {
            categoryId,
          },
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }
  //categoryIdからpost数を取得
  getNumberOfPostsByCategoryId(
    userId: string,
    categoryId: string,
  ): Promise<number> {
    return this.prisma.post.count({
      where: {
        status: 'published',
        userId: userId,
        categories: {
          some: {
            categoryId,
          },
        },
      },
    });
  }
  //特定ユーザーの投稿、下書きを一件取得
  // getPostOrDraftById(postId: string): Promise<Post> {
  //   return this.prisma.post.findUnique({
  //     where: {
  //       id: postId,
  //     },
  //   });
  // }
}
