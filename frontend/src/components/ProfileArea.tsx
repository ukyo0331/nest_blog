import { FC } from 'react';
import Image from 'next/image';


const ProfileArea: FC = () => {
  return (
    <section className='h-screen w-full bg-amber-700 flex justify-center items-center'>
      <div className='h-full w-screen max-w-[1024px] flex justify-center items-center relative bg-amber-200'>
        <figure className='absolute flex-auto w-[90vw] h-[90vw] top-6'>
          <Image
            src='/profile02.jpg'
            alt='profile画像'
            fill
            // sizes="90vw"
            style={
              { objectFit: 'contain' }
            }
            priority={true}
            loading='eager'
            className=''
          />
        </figure>
        <div className='bg-[#2B3C5B] text-white absolute top-96 flex-auto h-60 w-[90vw] rounded'>
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