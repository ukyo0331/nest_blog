import type { NextPage } from 'next'
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useForm, yupResolver } from "@mantine/form";
import { AuthForm } from "../types";
import axios from "axios";
import {Alert, Button, Group, PasswordInput, TextInput} from "@mantine/core";
import { IconDatabase } from "@tabler/icons";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import Layout from "../src/components/Layout";
import useHandleMenuClick from '../src/hooks/dashboard/useHandleMenuClick';

const schema = Yup.object().shape({
    email: Yup.string().email('invalid email')
        .required('No email provided')
        .max(50, 'Email should be max 50 chars'),
    password: Yup.string()
        .required('No password provided')
        .min(6, 'Password should be min 6 chars')
        .max(50, 'Email should be max 50 chars')
})

const Login: NextPage = () => {
    const router = useRouter();
    const [error, setError] = useState('')
    const form = useForm<AuthForm>({
        validate: yupResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    })
    const { setRenderScreen } = useHandleMenuClick();
    //ログイン処理
    const handleSubmit = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    email: form.values.email,
                    password: form.values.password,
                });
            form.reset();
            //loginに成功したらdashboardへ
            setRenderScreen('createPost');
            router.push('/dashboard');
        } catch (e: any) {
            setError(e.response.data.message)
        }
    }
    return (
        <Layout title={'ログインページ'} desc={'ブログのログインページです'}>
            <div className='w-screen h-[calc(100vh-50px)] bg-gray-200 flex items-center justify-center'>
                <form
                    className='p-5 bg-gray-400 flex flex-col justify-between'
                    onSubmit={form.onSubmit(handleSubmit)}
                >
                    <TextInput
                        mt='md'
                        placeholder="メールを入力"
                        id='email'
                        label='Email*'
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        mt='md'
                        placeholder="パスワードを入力"
                        id='password'
                        label='Password*'
                        description='Must be min 6 char'
                        {...form.getInputProps('password')}
                    />
                        <Button
                            mt='xl'
                            size="sm"
                            leftIcon={<IconDatabase/>}
                            type='submit'
                        >
                            ログイン
                        </Button>
                    {error && (
                        <Alert
                            my='md'
                            variant='filled'
                            title='ログインエラー'
                            icon={<ExclamationCircleIcon/>}
                            color='red'
                            radius='md'
                        >
                            {error}
                        </Alert>
                    )}
                </form>
            </div>
        </Layout>
    )
}

export default Login;