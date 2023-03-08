import { NextPage } from 'next';
import { PostType } from '../../types';
import ArticleList from '../../src/components/ArticleList';
import { useQueryDrafts } from '../../src/hooks/post/useQueryPosts';
import { Loader } from '@mantine/core';

const DraftList: NextPage = () => {
  const options = {
    scale: 1.2,
    speed: 1000,
    max: 10,
    glare: true,
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
      <div
        className='grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-3'
      >
        <ArticleList articles={data as PostType[]} options={options}/>
      </div>
    </>
  )
}
export default DraftList;