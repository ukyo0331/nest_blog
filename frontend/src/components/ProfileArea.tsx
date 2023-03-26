import { FC } from 'react';
import Image from 'next/image';


const ProfileArea: FC = () => {
  return (
    <section className='bg-amber-700'>
      <div className=''>
        <figure className=''>
          <Image
            src='/profile02.jpg'
            alt='profile画像'
            width={300}
            height={300}
            sizes='40vw'
            style={
            { objectFit: 'cover' }}
            priority={true}
            loading='eager'
            className=''
          />
        </figure>
        <div className=''>
          <h2 className=''>
            Profile
          </h2>
          <p className=''>
            一匹の野良猫との出会いをきっかけに(?)、<br/>
            30代から小売業→エンジニア転職を目指し、勉強を始めました<br/>
            現在はPHPも並行して学習中で、<br/>
            フルスタックで活躍できるエンジニアを目指します!
          </p>
        </div>
      </div>
    </section>
  )
};

export default ProfileArea;