import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import Custom404 from '../../pages/404';

type PaginationPropsType = {
    totalPage: number;
    postsPerPage: number
}

const Pagination: FC<PaginationPropsType> = ({totalPage, postsPerPage}) => {
    const router = useRouter();
    const page = parseInt(router.query.page as string) || 1;
    const [currentPage, setCurrentPage] = useState<number>(1);
    //ページNo.の表示個数制限を5に設定
    const limit = 5;
    const start = Math.max(1, currentPage - Math.floor(limit / 2));
    const end = Math.min(totalPage, start + limit - 1);
    const pageNumberArray = Array.from({length: end - start + 1}, (_, i) => i + start);
    //ページ移動のロジック
    const handlePageChange = (num: number) => {
        setCurrentPage(num);
        router.push(`${router.pathname}?page=${num}`);
    }
    return (
        <ul className='flex '>
            <li>
                <a
                    onClick={(e) => {
                        handlePageChange(1);
                    }}
                >
                    <span>＜</span>
                </a>
            </li>
            {pageNumberArray.map((num, index) => {
                return (
                    <li key={index}>
                        <a onClick={(e) => {
                            handlePageChange(num)
                        }}>
                            <span
                            className={`${num === page ? 'bg-amber-400' : ''}`}
                                >{num}</span>
                        </a>
                    </li>
                )
            })}
            <li>
                <a
                    onClick={(e) => {
                        handlePageChange(totalPage);
                    }}
                >
                    <span>＞</span>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
