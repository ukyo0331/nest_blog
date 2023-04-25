import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCommentList = () => {
  const [ commentData, setCommentData] = useState<string[]>();
  useEffect(() => {
    const getComment = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comment`);
      setCommentData(response.data);
    };
    getComment();
  }, []);
  console.log(commentData);
  return (
    <>
      {commentData?.map((comment, index) => {
        return (
          <p key={index}>{comment}</p>
        )
      })}
    </>
  );
};

export default AdminCommentList;
