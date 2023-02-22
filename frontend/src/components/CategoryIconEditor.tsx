import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryIconButton from './CategoryIconButton';
import { CategoryButtonType } from '../../types';
import { headers } from 'next/headers';

const CategoryIconEditor = () => {
  const [iconData, setIconData] = useState<Array<string>>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/image/getListObjects`);
      setIconData(data.data);
    }
    fetchData();
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image/upload`,
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
    }

    if (!e.target.files) return null;
    const file = e.target.files[0];
    await uploadFile(file);
  //   // const reader = new FileReader();
  //   // reader.readAsArrayBuffer(file);
  //   // reader.onloadend = async () => {
  //   //   const arrayBuffer = reader.result as ArrayBuffer;
  //   //   const dataBuffer = Buffer.from(arrayBuffer);
  //   //   await uploadFile(dataBuffer, file.name);
  //   // };
  }

  return (
    <>
      <form>
        <input type='file' accept='image/png' required onChange={handleFileSelect}/>
        {/*<button type='submit'>アイコンをアップロードする</button>*/}
      </form>
      <CategoryIconButton
        categories={iconData.map(category => ({
          category: {
            name: category.replace('.png', '')
          }
        }) as unknown as CategoryButtonType)
      }/>
    </>
  )
}
export default CategoryIconEditor;