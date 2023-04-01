import Image from 'next/image';
import Toc from './Toc';

const RightBar = () => {
  return (
    <div className='hidden md:inline-block md:fixed md:top-0 md:right-0 sm:w-64 md:h-screen bg-amber-600'>
      <div className='bg-amber-400 flex flex-col items-center'>
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
