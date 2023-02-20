import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader } from '@mantine/core';

type ImageComponentType = {
  imageKey: string;
}
const ImageComponent: FC<ImageComponentType> = ({ imageKey }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    async function getImage() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/preSignedUrlForGet?key=${imageKey.toLowerCase()}`).then((_) => _.json());
      console.log(response.preSignedUrl);
      setImageUrl(response.preSignedUrl)
    }
    getImage();
  }, [imageKey]);

  if (!imageUrl) return <Loader />

  return <Image src={imageUrl} alt={'カテゴリアイコン'}　width={20} height={20}/>
}

export default ImageComponent;