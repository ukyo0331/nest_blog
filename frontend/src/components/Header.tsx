import { useRouter } from 'next/router';
import SiteLogo from '../../public/SiteLogo.svg';
import HamburgerMenu from './HamburgerMenu';
import useHandleClickToCloseMenu from '../hooks/dashboard/useHandleClickToCloseMenu';

export const headerItems = [
  {
    title: 'HOME',
    link: '/',
  },
  {
    title: 'About this site',
    link: '/',
    href: '#this_site'
  },
  {
    title: 'Profile',
    link: '/',
    href: '#profile'
  },
  {
    title: 'Articles',
    link: '/blog'
  }
]

const Header = () => {
  const router = useRouter();
  const {isMenuOpen, setIsMenuOpen } = useHandleClickToCloseMenu();
  return (
    <>
      <header className='w-screen h-16 bg-[#2B3C5B] flex items-center fixed top-0 left-0 z-50'>
        <div className='text-white h-14 w-full lg:max-w-[1024px] sm:max-w-[50rem] flex items-center m-auto justify-between'>
          <div>
            <a href={'/'}>
              <SiteLogo
                width={200}
                className={`p-3`}
              />
            </a>
          </div>
          <div>
            <div
              className={`sm:hidden mr-8 border-[1px] rounded cursor-pointer`}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsMenuOpen(state => !state)
              }}
            >
              <span className={`bg-white block w-6 h-0.5 m-2 transition-opacity transition-transform ${isMenuOpen ? `rotate-45 translate-y-[10px]` : ``}`}/>
              <span className={`bg-white block w-6 h-0.5 m-2 transition-opacity ${isMenuOpen ? `opacity-0` : `opacity-1`}`}/>
              <span className={`bg-white block w-6 h-0.5 m-2 transition-opacity transition-transform ${isMenuOpen ? `rotate-[-45deg] translate-y-[-10px]` : ``}`}/>
            </div>
           <HamburgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            <nav>
              <ul className={`sm:flex hidden mr-5`}>
                {headerItems.map((item, index) => {
                  return (
                    <li key={index} className={`cursor-pointer mx-3 font-bold`}>
                      <a onClick={(e: React.MouseEvent) =>{
                        e.preventDefault();
                        router.push(item.href ? `${item.link}${item.href}` : `${item.link}`)
                      }}
                      >
                        {item.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;