import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader } from '@mantine/core';

type ImageComponentType = {
  imageKey: string;
}
const CategoryImageComponent: FC<ImageComponentType> = ({ imageKey }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    async function getImage() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/preSignedUrlForGet?key=${imageKey.toLowerCase()}`);
      if (!response.ok || response.status !== 200) {
        const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/preSignedUrlForGet?key=noImage.png`);
        const fallbackJson = await fallbackResponse.json();
        setImageUrl(fallbackJson.preSignedUrl);
      } else {
        const json = await response.json();
        setImageUrl(json.preSignedUrl);
      }
    }
    getImage();
  }, [imageKey]);


  if (!imageUrl) return <Loader />

  return <Image src={imageUrl} alt={'カテゴリアイコン'}　width={20} height={20}/>
}

export default CategoryImageComponent;