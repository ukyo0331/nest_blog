import { footer } from 'mdast-util-to-hast/lib/footer';

const Footer = () => {
  return (
    <>
      <footer className='w-screen h-16 bg-[#2B3C5B] flex items-center'>
        <div className='text-white h-14 w-full max-w-[1024px] mx-auto'>
          <div className='flex justify-center items-center h-full'>
            YUTA CODE .　<small>(2023)</small>
          </div>
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      <a href='https://github.com/yuta-0331'>github</a>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          <div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;