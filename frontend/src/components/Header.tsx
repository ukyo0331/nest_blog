import { useRouter } from 'next/router';
import SiteLogo from '../../public/SiteLogo.svg';

const headerItems = [
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
  return (
    <>
      <header className='w-screen h-16 bg-[#2B3C5B] flex items-center fixed top-0 left-0 z-50'>
        <div className='text-white h-14 w-full lg:max-w-[1024px] sm:max-w-[50rem] flex items-center m-auto justify-between'>
          <div>
            <a href={'/'}>
              <SiteLogo
                width={200}
              />
            </a>
          </div>
          <div>
            <ul className={`flex`}>
              {headerItems.map((item, index) => {
                return (
                  <li key={index} className={`cursor-pointer mx-3`}>
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
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;