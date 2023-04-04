import Image from 'next/image';
import Toc from './Toc';

const RightBar = () => {
  return (
    <div className='hidden md:inline-block sm:w-64 md:h-screen'>
      <div className='w-64 flex flex-col items-center fixed h-screen'>
        <Image
          src='/profile02.jpg'
          alt='hero image'
          className='rounded'
          width={150}
          height={150}
          style={{ objectFit: 'cover' }}
        />
        <p>created by Yuta</p>
        <Toc/>
      </div>
    </div>
  )
}

export default RightBar;
