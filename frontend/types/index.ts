import React from "react";

export type AuthForm = {
    email: string,
    password: string,
}
export type EditedPost = {
    id: string,
    title: string,
    //name => category name
    name?: string | null,
    desc?: string | null,
    status: string,
}
export type PostType = {
    id: string,
    title: string,
    desc: string,
    likes: number,
    status: string,
    image: string,
    createdAt: number,
    updatedAt: number,
    userId: string,
    categories?: Array<CategoryButtonType>,
    comments: string[],
}
export type CategoryProps = {
    categories?: Array<CategoryButtonType>;
}
export type CategoryButtonType = {
    category: {
        name: string[]
    }
}
export type CommentType = {

}
export type EditedComment = {

}

type OgpMetaData = {
    id: string
    encodedUrl: string
    title: string
    image: string
    favicon: string
    description: string
    postId: string
}