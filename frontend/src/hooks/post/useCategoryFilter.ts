import axios from "axios";
import { PostType } from "../../../types";
import { useQuery } from "@tanstack/react-query";

//get all
export const useQueryPosts = (
    userId: string,
) => {
    const getPosts = async () => {
        const { data } = await axios.get<PostType[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/post/${userId}`,
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