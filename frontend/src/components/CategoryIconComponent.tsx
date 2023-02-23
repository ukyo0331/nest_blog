import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader } from '@mantine/core';
import axios from 'axios';

type ImageComponentType = {
  imageKey: string;
}
const CategoryIconComponent: FC<ImageComponentType> = ({ imageKey }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    async function getImage() {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/image/preSignedUrlForGet?key=${imageKey.toLowerCase()}`)
        .then((_) => _.data.preSignedUrl);
      setImageUrl(response);
    }
    getImage();
  }, [imageKey]);


  if (!imageUrl) return <Loader />

  return <Image
    src={imageUrl}
    alt={'カテゴリアイコン'}　
    width={100}
    height={100}
  />
}

export default CategoryIconComponent;