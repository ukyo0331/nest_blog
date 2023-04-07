import { motion } from 'framer-motion';
import { FC } from 'react';
import { headerItems } from './Header';
import { useRouter } from 'next/router';

type HamburgerMenuProps = {
  isOpenMenu: boolean;
}

const variants = {
  open: { opacity: 0.8, x: -180 },
  closed: { opacity: 0, x: "100%" },
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ isOpenMenu }) => {
  const router = useRouter();
  return (
    <motion.div
      className={`fixed mt-4 w-[50vw] h-fit bg-[#2B3C5B] ${isOpenMenu ? `block` : `hidden`} sm:hidden`}
      animate={ isOpenMenu ? 'open' : 'closed'}
      variants={variants}
    >
      <nav>
        <ul>
          {headerItems.map((item, index: number) => {
            return (
              <li key={index} className={`text-xl cursor-pointer font-bold p-4`}>
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
    </motion.div>
  )
}

export default HamburgerMenu;
