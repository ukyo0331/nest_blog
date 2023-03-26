import Image from 'next/image';

const HeroArea = () => {
  return (
    <div className='w-screen h-96 bg-center bg-cover relative'>
      <Image src='/heroImage.jpg'
             alt='hero image'
             className='absolute blur-sm'
             fill
             style={{ objectFit: 'cover'}}
             priority={true}
             loading='eager'
      />
      <section className='w-full h-full flex flex-col justify-center items-center absolute'>
        <h1 className='text-white min-h-0 font-bold mb-10 text-center text-[clamp(48px,5vw,68px)]'>
          YUTA code .（仮）
        </h1>
      </section>
    </div>
  );
};

export default HeroArea;