import { useRouter } from 'next/router';
import axios from 'axios';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Post } from '@prisma/client';
import useStore from '../../store/postStore';
import { EditedPost } from "../../../types";

export const useMutatePost = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const reset = useStore((state) => state.resetEditedPost);
    //投稿の作成
    const createPostMutation = useMutation(
        async (post: Omit<EditedPost, 'id'>) => {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/post`,
                post
            );
            return response.data;
        },
        {
            onSuccess: (res) => {
                const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
                if (previousPosts) {
                    queryClient.setQueriesData(['posts'], [res, ...previousPosts])
                }
                reset();
            },
            onError: (err: any) => {
                reset();
                if (err.response.status === 401 || err.response.status === 403)
                    router.push('/login');
            },
        },
    );
    //投稿の更新
    const updatePostMutation = useMutation(
        async (post: EditedPost) => {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/post/${post.id}`,
                post
            );
            return response.data;
        },
        {
            onSuccess: (res, variables) => {
                const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
                if (previousPosts) {
                    queryClient.setQueriesData(
                        ['posts'],
                        previousPosts.map((post) => (post.id === res.id ? res : post))
                    );
                }
                reset();
            },
            onError: (err: any) => {
                // reset();
                if (err.response.status === 401 || err.response.status === 403)
                    router.push('/login');
            },
        },
    );
    //投稿の削除
    const deletePostMutation = useMutation(
        async (id: string) => {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/post/${id}`
            )
        },
        {
            onSuccess: (_, variables) => {
                const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
                if (previousPosts) {
                    queryClient.setQueriesData(
                        ['posts'],
                        previousPosts.filter((post) => (post.id !== variables))
                    );
                }
                reset();
            },
            onError: (err: any) => {
                reset();
                if (err.response.status === 401 || err.response.status === 403)
                    router.push('/login');
            },
        }
    )
    return { createPostMutation, updatePostMutation, deletePostMutation };
}
