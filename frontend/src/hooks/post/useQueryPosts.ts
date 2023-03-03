import { useRouter } from 'next/router';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../../types";

//下書きの取得
//get all
export const useQueryDrafts = () => {
    const router = useRouter();
    const getDrafts = async () => {
        const { data } = await axios.get<PostType[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/post/getAllDrafts`
        );
        return data;
    }
    return useQuery<PostType[], Error>({
        queryKey: ['drafts'],
        queryFn: getDrafts,
        onError: (err: any) => {
            if (err.response.status === 401 || err.response.status === 403)
                router.push('/login');
        },
    })
}
//get one
export const useQueryDraft = (postId: string) => {
    const router = useRouter();
    const getOneDraft = async () => {
        const { data } = await axios.get<PostType>(
            `${process.env.NEXT_PUBLIC_API_URL}/post/draft/${postId}`
        );
        return data;
    }
    return useQuery<PostType, Error>({
        queryKey: ['draft'],
        queryFn: getOneDraft,
        onError: (err: any) => {
            if (err.response.status === 401 || err.response.status === 403)
                router.push('/login');
        }
    })
}

//postの取得
//get one
export const useQueryPost = (postId: string) => {
    const getOnePost = async () => {
        const { data } = await axios.get<PostType>(
            `${process.env.NEXT_PUBLIC_API_URL}/post/blog/${postId}`
        );
        return data;
    }
    return useQuery<PostType, Error>({
        queryKey: ['post', postId],
        queryFn: getOnePost,
        onError: (err: any) => {
            console.error(err);
        }
    })
}
//get all
export const useQueryPosts = (
    userId: string,
    skip: number,
    take: number
) => {
    const getPosts = async () => {
        const { data } = await axios.get<PostType[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/post/${userId}`, {
                data: {
                    skip,
                    take,
                }
            }
        );
        return data;
    }
    return useQuery<PostType[], Error>({
        queryKey: ['posts'],
        queryFn: getPosts,
        onError: (err: any) => {
            console.error(err)
        },
    })
}