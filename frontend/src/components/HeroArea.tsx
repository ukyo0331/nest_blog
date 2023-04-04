import Image from 'next/image';
import { useRouter } from 'next/router';
import SiteLogo from '../../public/SiteLogo.svg';

const HeroArea = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/blog')
  }
  return (
    <div className='w-screen h-[80vh] bg-center bg-cover relative'>
      <Image src='/heroImage.jpg'
             alt='hero image'
             className='absolute blur-sm'
             fill
             style={{ objectFit: 'cover'}}
             priority={true}
             loading='eager'
      />
      <section className='w-full h-full flex flex-col justify-center items-center absolute'>
        <button
          onClick={(e: React.MouseEvent) => handleClick(e)}
          className='top-button uppercase mt-12'
        >
          article list
        </button>
        <h1 className='absolute bottom-6'>
          <SiteLogo
            width={600}
          />
        </h1>
      </section>
    </div>
  );
};

export default HeroArea;