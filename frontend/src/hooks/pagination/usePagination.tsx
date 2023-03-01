import { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultPostsPerPage } from '../../defaultPostsPerPage';

const usePagination = (url: string) => {
  const [ totalPage, setTotalPage ] = useState<number>(0)
  const fetchTotalPage = async () => {
    const data: number = await axios.get(url).then((_) => _.data);
    setTotalPage(Math.ceil(data / defaultPostsPerPage));
  }

  useEffect(() => {
    fetchTotalPage()
  }, []);

  return totalPage;
}

export default usePagination;