import { FC } from "react";
import { useRouter } from "next/router";
import ImageComponent from './CategoryIconComponent';

type RightSidebarCategoryMenuProps = {
  categories: string[]
};

//ライトバーに設置するカテゴリメニューリスト
const RightSidebarCategoryMenu: FC<RightSidebarCategoryMenuProps> = ({ categories }) => {
  const router = useRouter()
  return (
    <div className='w-52 h-fit'>
      {categories?.map((arg: string, index:number) => {
        return (
          <div className={`inline-block p-1`}>
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                router.push(`/blog/category/${arg}`)
              }}
              className='transition-all duration-500 ease-out h-8 w-fit rounded-[16px] flex justify-between m-0 bg-amber-20 border border-solid-1 cursor-pointer hover:bg-blue-50 hover:scale-105'
            >
              <figure className='mt-1 ml-1 w-6 h-6 mr-2 rounded-[100%] flex justify-center'>
                <ImageComponent imageKey={`${arg}.png`}/>
              </figure>
              <div className='mt-1 mr-2 whitespace-nowrap'>
                {arg}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RightSidebarCategoryMenu;