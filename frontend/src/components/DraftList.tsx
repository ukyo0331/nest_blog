import { NextPage } from 'next';
import { PostType } from '../../types';
import ArticleList from '../../src/components/ArticleList';
import { useQueryDrafts } from '../../src/hooks/post/useQueryPosts';
import { Loader } from '@mantine/core';

const DraftList: NextPage = () => {
  const options = {
    scale: 1.2,
    speed: 1000,
    max: 10
  }
  //レンダリングする画面のコントロール
  const { data } = useQueryDrafts();
  if (!data) return <Loader />
  return (
    <>
      <div>
        <h1>
          下書き一覧
        </h1>
      </div>
      <div className='grid gap-3 grid-cols-2'>
        <ArticleList articles={data as PostType[]} options={options}/>
      </div>
    </>
  )
}
export default DraftList;