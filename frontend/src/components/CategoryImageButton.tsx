import { CategoryButtonType, CategoryProps} from "../../types";
import CategoryImageFallback from "./CategoryImageFallback";
import { FC } from "react";

//用意されたカテゴリの画像を使用したボタン
const CategoryImageButton: FC<CategoryProps> = ({categories, onClick}) => {
    return (
        <div className='w-auto h-8 flex justify-start'>
            {categories?.map((arg: CategoryButtonType, index:number) => {
                return (
                    <div
                        key={index}
                        onClick={() => onClick}
                        className='h-8 rounded-[16px] flex justify-between m-0 bg-amber-20　border-black border border-solid-1 cursor-pointer'
                    >
                        <figure className='mt-1 ml-1 w-6 h-6 mr-2 rounded-[100%] flex justify-center'>
                            <CategoryImageFallback
                                src={`/category_icon/${arg.category.name}.png`}
                                fallbackSrc={`/category_icon/noImage.png`}
                            />
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

export default CategoryImageButton;