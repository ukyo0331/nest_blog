import { useState } from 'react';
import { useRouter } from 'next/router';

//サイドバーやハンバーガーメニューをクリックした際のレンダリングの出し分けのためのHook
const useHandleMenuClick = () => {
  const router = useRouter();
  const [renderScreen, setRenderScreen] = useState<string>('create');
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const clickedMenu = (e.currentTarget as HTMLInputElement).id;
    setRenderScreen(clickedMenu);

    if (!(router.pathname === '/dashboard'))
      router.push('/dashboard');
  }
  return {
    renderScreen, handleMenuClick
  };
};

export default useHandleMenuClick;
