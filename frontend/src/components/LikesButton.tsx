import axios from 'axios';
import { FC, useState } from 'react';

type LikesButtonPropsType = {
  postId: string;
  initialLikes: number;
}

const LikesButton: FC<LikesButtonPropsType> = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const onClickButton = async () => {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/post/likes/${postId}`);
    setLikes(response.data.likes);
  }
  return (
    <>
      <button onClick={() => onClickButton()}>
        <figure>
          <svg xmlns="http://www.w3.org/2000/svg"
               className="w-6 h-6"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="gray"
               fill="none"
               strokeLinecap="round"
               strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        </figure>
      </button>
      <span>{likes}</span>
    </>
  )
}

export default LikesButton;