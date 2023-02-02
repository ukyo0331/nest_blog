import React from "react";
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

export const PostForm = () => {
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
            createPostMutation.mutate({
                title: editedPost.title,
                desc: editedPost.desc,
                name: editedPost.name,
                status: props.button === 'postedButton' ? 'published' : 'draft',
            })
        else {
            updatePostMutation.mutate({
                id: editedPost.id,
                title: editedPost.title,
                desc: editedPost.desc,
                name: editedPost.name,
                status: props.button === 'postedButton' ? 'published' : 'draft'
            })
        }
    }
    return (
        <div className='w-full h-auto pt-48 bg-gray-200 flex items-center justify-center min-h-calc(100vh - 40px)'>
            <div className='h-70% w-min(92%,1166px)'>
                <div className='flex flex-col'>
                    <div>
                        <dl>
                            <dt>タイトル</dt>
                            <dd>
                                <input
                                    className='w-6/12 h-12 mb-4 rounded border border-gray-400'
                                    type="text"
                                    name='blogTitle'
                                    placeholder="タイトルを入力"
                                    value={editedPost.title || ''}
                                    onChange={(e) => update({...editedPost, title: e.target.value})}
                                    autoComplete='off'
                                />
                            </dd>
                            <dt>カテゴリー</dt>
                            <dd>
                                <input
                                    className='w-6/12 h-12 mb-4 rounded border border-gray-400'
                                    type="text"
                                    name='blogCategory'
                                    value={editedPost.name || ''}
                                    onChange={(e) => update({...editedPost, name: e.target.value})}
                                    placeholder='カテゴリーを入力'
                                    autoComplete='off'
                                />
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <div className='w-full'>
                            <div className='w-min(92%,1166px)'>
                                <SimpleMDE
                                    value={editedPost.desc || 'init value'}
                                    onChange={(value) => {
                                        setMarkdownValue(value);
                                        update({...editedPost, desc: value})
                                    }}
                                    spellCheck={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mr-16'>
                        <button
                            className='bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-700'
                            onClick={(e) => {
                                handleSubmit(e, {button: 'postedButton'})
                            }}
                        >
                            {editedPost.id === '' ? '投稿する' : '編集する'}
                        </button>
                        <button
                            className='bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500'
                            onClick={(e) => {
                                handleSubmit(e, {button: 'draftSaveButton'})
                            }}
                        >
                            下書きを保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}