import Image from "next/image";
import { useState } from "react";

interface CategoryImageFallbackProps {
    src: string;
    fallbackSrc: string;
}
//カテゴリーアイコンが存在しない場合はデフォルトの画像を表示する
export default function CategoryImageFallback({ src, fallbackSrc }: CategoryImageFallbackProps) {
    const [isError, setIsError] = useState(false);
    return (
        <Image
            height={20}
            width={20}
            src={isError ? fallbackSrc: src}
            alt='カテゴリーのイメージ画像です'
            onError={(event) => {
                event.preventDefault()
                setIsError(true);
            }}
        />
    );
}