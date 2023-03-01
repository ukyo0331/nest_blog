import { useState } from 'react';

//サイドバーやハンバーガーメニューをクリックした際のレンダリングの出し分けのためのHook
const useHandleMenuClick = () => {
  const [renderScreen, setRenderScreen] = useState<string>('create');
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const clickedMenu = (e.currentTarget as HTMLInputElement).id;
    setRenderScreen(clickedMenu);
  }
  return {
    renderScreen, handleMenuClick
  };
};

export default useHandleMenuClick;
