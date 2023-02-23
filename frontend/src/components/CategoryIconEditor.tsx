import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryIconButton from './CategoryIconButton';
import { CategoryButtonType } from '../../types';

const CategoryIconEditor = () => {
  const [iconData, setIconData] = useState<Array<string>>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');


  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files)
    setSelectedImage(e.target.files[0]);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!selectedImage) {
      setResult('画像が選択されていません');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image/upload`, formData)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          setResult('画像アップロードに成功しました');
        } else {
          setResult(`アップロードに失敗しました: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error(error);
        setResult('画像アップロードに失敗しました');
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/image/getListObjects`);
      setIconData(data.data);
    }
    fetchData();
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/png' required onChange={handleFileInputChange}/>
        <button type='submit'>アイコンをアップロードする</button>
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