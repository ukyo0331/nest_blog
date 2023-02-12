import { useRouter } from 'next/router';
import axios from "axios";
import { User } from '@prisma/client';
import { useQuery } from "@tanstack/react-query";

const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'hashedPassword'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`
    )
    return data;
}
export const useQueryUser = () => {
    const router = useRouter();
    return useQuery<Omit<User, 'hashedPassword'>, Error>({
        queryKey: ['user'],
        queryFn: getUser,
        onError: (err: any) => {
            if (err.response.status === 401 || err.response.status === 403)
                router.push('/');
        },
    })
}
//上記のリダイレクトを除いたもの
export const useQueryUserWithoutRedirect = () => {
    return useQuery<Omit<User, 'hashedPassword'>, Error>({
        queryKey: ['user'],
        queryFn: getUser,
        onError: (err: any) => {
            console.error(err);
        },
    })
}