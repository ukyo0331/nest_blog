import { FC } from 'react';
import Image from 'next/image';


const ProfileArea: FC = () => {
  return (
    <section className='h-screen w-full bg-amber-700 flex justify-center items-center sm:h-[60vh]'>
      <div className='h-full w-screen max-w-[1024px] flex flex-col justify-center items-center relative bg-amber-200 gap-7'>
        <figure className='relative w-[90vw] h-[90vw] sm:absolute sm:w-[40vw] sm:h-[40vw] sm:top-6 sm:left-6'>
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
        <div className='bg-[#2B3C5B] text-white h-60 w-[90vw] rounded sm:absolute sm:top-[40vw] left-[40vw]'>
          <h2 className='font-bold text-3xl pt-6 pl-6'>
            Profile
          </h2>
          <p className='text-xl overflow-auto p-3'>
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