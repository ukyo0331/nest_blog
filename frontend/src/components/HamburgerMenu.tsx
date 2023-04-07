import { motion } from 'framer-motion';
import { Dispatch, FC, Ref, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { headerItems } from './Header';
import { useRouter } from 'next/router';

type HamburgerMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuListRef: RefObject<HTMLUListElement>;
}

const variants = {
  open: { opacity: 0.8, x: -100 },
  closed: { opacity: 0, x: "100%" },
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ isMenuOpen, setIsMenuOpen, menuListRef }) => {
  const router = useRouter();
  return (
    <motion.div
      className={`fixed mt-4 w-[50vw] h-fit bg-[#2B3C5B] ${isMenuOpen ? `block` : `hidden`} sm:hidden`}
      animate={ isMenuOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.3 }}
      // ref={menuListRef}
    >
      <nav>
        <ul>
          {headerItems.map((item, index: number) => {
            return (
              <li key={index} className={`text-xl cursor-pointer font-bold p-4 hover:bg-gray-500`}>
                <a onClick={(e: React.MouseEvent) =>{
                  e.preventDefault();
                  router.push(item.href ? `${item.link}${item.href}` : `${item.link}`)
                  setIsMenuOpen(false)
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
