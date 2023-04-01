import Image from 'next/image';

const RightBar = () => {
  return (
    <div className='hidden md:inline-block md:fixed md:top-0 md:right-0 sm:w-64 md:h-screen bg-amber-600 flex j'>
      <div className='bg-amber-400'>
        <h2>
          Created by
        </h2>
        <p>Yuta</p>
        <Image
          src='/profile02.jpg'
          alt='hero image'
          className='rounded'
          width={150}
          height={150}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

export default RightBar;
