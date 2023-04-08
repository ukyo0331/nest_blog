import { useEffect, useRef, useState } from 'react';

const useHandleClickToCloseMenu = () => {
  //メニューボタンが押されたかどうかを判定するstate
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  //メニュー枠外がクリックされた場合にメニューを閉じるロジック
  useEffect(() => {
    const handleClickToCloseMenu = (e: any) => {
      if (!isMenuOpen) return;
      setIsMenuOpen(false);
    };
    window.addEventListener('click', handleClickToCloseMenu);
    return () => {
      window.removeEventListener('click', handleClickToCloseMenu);
    };
  }, [isMenuOpen])

  return {
    isMenuOpen, setIsMenuOpen,
  }
}

export default useHandleClickToCloseMenu;