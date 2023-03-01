import { useEffect, useRef, useState } from 'react';

const useHandleClickToCloseMenu = () => {
  //メニューボタンが押されたかどうかを判定するstate
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  //メニュー枠外がクリックされた場合にメニューを閉じるロジック
  const menuListRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleClickToCloseMenu = (e: any) => {
      const element = menuListRef.current;
      if (!isMenuOpen || element?.contains(e.target)) return;
      setIsMenuOpen(false);
    };
    window.addEventListener('click', handleClickToCloseMenu);
    return () => {
      window.removeEventListener('click', handleClickToCloseMenu);
    };
  }, [isMenuOpen, menuListRef])

  return {
    isMenuOpen, menuListRef, setIsMenuOpen,
  }
}

export default useHandleClickToCloseMenu;