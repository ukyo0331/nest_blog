import { footer } from 'mdast-util-to-hast/lib/footer';

const Footer = () => {
  return (
    <>
      <footer className='w-screen h-16 bg-[#2B3C5B] flex items-center'>
        <div className='text-white h-14 w-full max-w-[1024px] bg-red-300'>
          <div>
            footer
          </div>
          <div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;