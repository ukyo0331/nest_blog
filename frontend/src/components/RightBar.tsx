import Image from 'next/image';

const RightBar = () => {
  return (
    <div className='hidden md:inline-block flex '>
      <h2>
        Created by
      </h2>
      <p>Yuta</p>
      <Image
        src='/profile02.jpg'
        alt='hero image'
        className='absolute'
        width={150}
        height={150}
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

export default RightBar;
