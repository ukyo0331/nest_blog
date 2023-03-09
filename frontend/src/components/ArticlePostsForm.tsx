import React, { useMemo } from 'react';
import useStore from "../store/postStore";
import { useMutatePost } from '../hooks/post/useMutatePost';
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useState } from "react";

type SubmitButtonType = {
    button: 'postedButton' | 'draftSaveButton'
}
//markdown editorのインポート
const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"), {
        ssr: false,
    })

//ブログ記事投稿フォーム
export const ArticlePostsForm = () => {
    const { editedPost } = useStore();
    const update = useStore((state) => state.updateEditedPost);
    const { createPostMutation, updatePostMutation } = useMutatePost();
    const [ markdownValue, setMarkdownValue ] = useState('')

    //editedPost.idが存在->更新 存在しない->新規作成
    //押されたボタンがpostedButtonかどうかでpublishかdraftかを分ける
    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement,
            MouseEvent>,
        props: SubmitButtonType
    ) => {
        e.preventDefault();
        if (editedPost.id === '')
            //新規投稿の場合
            createPostMutation.mutate({
                title: editedPost.title,
                desc: editedPost.desc,
                name: editedPost.name,
                status: props.button === 'postedButton' ? 'published' : 'draft',
            })
        else {
            //更新（編集）の場合
            updatePostMutation.mutate({
                id: editedPost.id,
                title: editedPost.title,
                desc: editedPost.desc,
                name: editedPost.name,
                status: props.button === 'postedButton' ? 'published' : 'draft'
            })
        }
    }
    //SimpleMDEのオプションはuseMemoでラップする
    const options = useMemo(() => {
        return {
            spellChecker: false,
            maxHeight: '300px',
        };
    }, [])
    return (
        <div className='bg-white p-6 rounded-lg'>
            <div className='mb-4'>
                <dl className='mb-4'>
                    <dt className='text-lg font-medium'>タイトル</dt>
                    <dd>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            name='blogTitle'
                            placeholder={"タイトルを入力"}
                            value={editedPost.title || ''}
                            onChange={(e) => update({...editedPost, title: e.target.value})}
                            autoComplete='off'
                        />
                    </dd>
                    <dt className='text-lg font-medium'>カテゴリー</dt>
                    <dd>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            name='blogCategory'
                            value={editedPost.name || ''}
                            onChange={(e) => update({...editedPost, name: e.target.value})}
                            placeholder={'カテゴリーを入力'}
                            autoComplete='off'
                        />
                    </dd>
                </dl>
                <div className='mb-4'>
                    <div className='border border-gray-300 rounded w-[450px]'>
                        <SimpleMDE
                            value={editedPost.desc || 'Hello world'}
                            onChange={(value) => {
                                setMarkdownValue(value);
                                update({...editedPost, desc: value})
                            }}
                            options={options}
                        />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button
                        className='bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600'
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            handleSubmit(e, {button: 'postedButton'})
                        }}
                    >
                        {editedPost.id === '' ? '投稿する' : '編集する'}
                    </button>
                    <button
                        className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4'
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            handleSubmit(e, {button: 'draftSaveButton'})
                        }}
                    >
                        下書きを保存
                    </button>
                </div>
            </div>
        </div>
    )
}
