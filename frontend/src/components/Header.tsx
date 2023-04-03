import { useRouter } from 'next/router';

const headerItems = [
  {
    title: 'HOME',
    link: '/',
  },
  {
    title: 'About this site',
    link: '/',
  },
  {
    title: 'Profile',
    link: '/',
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
      <div className='w-screen h-16 bg-[#2B3C5B] flex items-center fixed top-0 left-0 z-50'>
        <div className='text-white h-14 w-full max-w-[1024px] flex items-center m-auto justify-between'>
          <div>
            YUTA CODE.
          </div>
          <div>
            <ul className={`flex`}>
              {headerItems.map((item, index) => {
                return (
                  <li key={index} className={`cursor-pointer`}>
                    <a onClick={(e: React.MouseEvent) =>{
                      e.preventDefault();
                      router.push(item.link)
                    }}>
                      {item.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;