import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCommentList = () => {
  const [ commentData, setCommentData] = useState<string[]>(null);
  useEffect(() => {
    const getComment = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}`);
      setCommentData(response.data);
    };
    getComment();
  }, []);
  console.log(commentData);
  return (
    <>
      {commentData.map((comment) => {
        return (
          <p>{comment}</p>
        )
      })}
    </>
  );
};

export default AdminCommentList;
