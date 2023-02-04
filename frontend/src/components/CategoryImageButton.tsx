import { CategoryButtonType, CategoryProps} from "../../types";
import CategoryImageFallback from "./CategoryImageFallback";
import { FC } from "react";

const CategoryImageButton: FC<CategoryProps> = ({categories, onClick}) => {
    return (
        <div>
            {categories?.map((arg: CategoryButtonType, index:number) => {
                return (
                    <div key={index} onClick={() => onClick}>
                        <figure>
                            <CategoryImageFallback
                                src={`/category_icon/${arg.category.name}.png`}
                                fallbackSrc={`/category_icon/noImage.png`}
                            />
                        </figure>
                        <div>
                            {arg.category.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CategoryImageButton;