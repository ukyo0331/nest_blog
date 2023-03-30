import { FC } from 'react';
import Image from 'next/image';


const ProfileArea: FC = () => {
  return (
    <section className='h-fit w-full flex justify-center items-center sm:h-[80vh] sm:bg-white'>
      <div className='h-full w-screen max-w-[1024px] flex flex-col justify-center items-center relative gap-7'>
        <figure className='mt-6 relative w-[90vw] h-[90vw] sm:absolute sm:w-[45%] sm:h-0 sm:aspect-w-2 sm:aspect-h-1 sm:mt-0 sm:left-[50%]'>
          <Image
            src='/profile02.jpg'
            alt='profile画像'
            fill
            style={
              { objectFit: 'contain' }
            }
            priority={true}
            loading='eager'
            className=''
          />
        </figure>
        <div className='bg-[#2B3C5B] mb-6 text-white h-fit w-[90vw] rounded sm:absolute sm:w-[45%] sm:mb-0 sm:left-[2%] sm:bg-white sm:text-[#2B3C5B]'>
          <h2 className='font-bold text-3xl pt-6 pl-6 sm:text-5xl sm:after:block sm:after:w-[30%] sm:after:h-0.5 sm:after:bg-[#2B3C5B] sm:after:mt-3'>
            Profile
          </h2>
          <p className='text-xl p-3'>
            一匹の野良猫との出会いをきっかけに(?)、
            30代から小売業→エンジニア転職を目指し、勉強を始めました。
            将来はフルスタックで活躍できるエンジニアを目指します!
          </p>
        </div>
      </div>
    </section>
  )
};

export default ProfileArea;