import React, { FC, useState } from "react";
import { useRouter } from "next/router";

type PaginationPropsType = {
    totalPage: number;
    postsPerPage: number
}

const Pagination: FC<PaginationPropsType> = ({totalPage, postsPerPage}) => {
    const router = useRouter();
    const currentPath = router.pathname;
    const [currentPage, setCurrentPage] = useState<number>(1);

    //ページ移動のロジック
    const handlePageChange = (e: React.MouseEvent, num: number) => {
        e.preventDefault();
        setCurrentPage(num);
        router.push(`${currentPath}?skip=${(num - 1) * postsPerPage}&take=${postsPerPage}`)
    }

    return (
        <ul className='flex '>
            <li>
                <a
                    onClick={(e) => {
                        handlePageChange(e, 1);
                    }}
                >
                    ＜
                </a>
            </li>
            {
                Array.from({ length: totalPage }, (_, i) => (
                    <li key={i}>
                        <a onClick={(e) => {
                            handlePageChange(e, i + 1)
                        }}>
                            {i + 1}
                        </a>
                    </li>
                ))
            }
            <li>
                <a
                    onClick={(e) => {
                        handlePageChange(e, totalPage);
                    }}
                >
                    ＞
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
