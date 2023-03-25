import { FC } from 'react';
import Image from 'next/image';


const ProfileArea: FC = () => {
  return (
    <section>
      <div>
        <figure className='w-[500px] h-[500px]'>
          <Image
            src='/profile02.jpg'
            alt='profile画像'
            fill
            style={{ objectFit: 'cover'}}
            priority={true}
          />
        </figure>
        <div className='bg-[#2B3C5B] text-white p-8'>
          <h2>
            Profile
            <span>プロフィール</span>
          </h2>
          <p>
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