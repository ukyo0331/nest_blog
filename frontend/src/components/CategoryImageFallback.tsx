import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

interface CategoryImageFallbackProps {
    src: string;
    fallbackSrc: string;
}
//カテゴリーアイコンが存在しない場合はデフォルトの画像を表示する
export default function CategoryImageFallback({ src, fallbackSrc }: CategoryImageFallbackProps) {
    const [isError, setIsError] = useState(false);
    const router = useRouter();
    return (
        <Image
            src={isError ? fallbackSrc : src}
            alt='カテゴリーのイメージ画像です'
            onError={(event) => {
                event.preventDefault()
                setIsError(true);
            }}
            width={20}
            height={20}
            style={{
                objectFit: 'contain'
            }}
        />
    );
}