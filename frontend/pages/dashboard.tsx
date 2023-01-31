import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from 'axios';
import { UserInfo } from "../src/components/UserInfo";
import { useQueryClient } from "@tanstack/react-query";
import Layout from "../src/components/Layout";

const Dashboard: NextPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const logout = async () => {
        queryClient.removeQueries(['user'])
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
        await router.push('/login');
    }
    return (
        <>
            <Layout title='ダッシュボード' desc='ダッシュボードです'>
                <button onClick={logout}>logout</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    router.push('/draftList')
                }}>下書き一覧</button>
                <UserInfo />
            </Layout>
        </>
    )
}

export default Dashboard;