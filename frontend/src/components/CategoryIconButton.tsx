import { CategoryButtonType, CategoryProps} from "../../types";
import { FC } from "react";
import { useRouter } from "next/router";
import ImageComponent from './CategoryIconComponent';

//用意されたカテゴリの画像を使用したボタン
const CategoryIconButton: FC<CategoryProps> = ({categories}) => {
    const router = useRouter()
    return (
        <div className='w-auto h-8 flex justify-start'>
            {categories?.map((arg: CategoryButtonType, index:number) => {
                return (
                    <div
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            router.push(`/blog/category/${arg.category.name}`)
                        }}
                        className='h-8 rounded-[16px] flex justify-between m-0 bg-amber-20　border-black border border-solid-1 cursor-pointer hover:bg-blue-50 hover:scale-105'
                    >
                        <figure className='mt-1 ml-1 w-6 h-6 mr-2 rounded-[100%] flex justify-center'>
                            <ImageComponent imageKey={`${arg.category.name}.png`}/>
                        </figure>
                        <div className='mt-1 mr-2 whitespace-nowrap'>
                            {arg.category.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CategoryIconButton;