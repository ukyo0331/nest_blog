const LikeButton = () => {
  const onClickButton = () => {

  }
  return (
    <>
      <button>
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
    </>
  )
}

export default LikeButton;