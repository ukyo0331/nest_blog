import { FC } from 'react';
import { useRouter } from 'next/router';
import useHandleClickToCloseMenu from '../hooks/dashboard/useHandleClickToCloseMenu';

type HamburgerMenuType = {
  handleMenuClick: (e: React.MouseEvent) => void
}

const DashboardHamburgerMenu: FC<HamburgerMenuType> = ({handleMenuClick}) => {
  const router = useRouter();
  //menu枠外をクリックした際にmenuを閉じるHook
  const { isMenuOpen, setIsMenuOpen } = useHandleClickToCloseMenu();
  return (
    <aside>
      <button
        onClick={() => setIsMenuOpen(state => !state)}
        className='fixed absolute right-0 bg-blue-800 md:hidden'
      >
        Menu
      </button>
      {isMenuOpen &&
        <aside
          className='md:hidden absolute bg-blue-400 w-[50%] h-full z-10'
          onClick={() => setIsMenuOpen(false)}
        >
          <ul>
            <li>
              <button id='createPost' onClick={(e) => {
                e.preventDefault();
                router.push('/dashboard')
              }}>
                記事作成
              </button>
            </li>
            <li>
              <button id='draftList' onClick={e => handleMenuClick(e)}>
                下書き一覧
              </button>
            </li>
            <li>
              <button id='articleList' onClick={e => handleMenuClick(e)}>
                記事一覧
              </button>
            </li>
            <li>
              <button id='commentList' onClick={e => handleMenuClick(e)}>
                コメント一覧
              </button>
            </li>
            <li>
              <button id='addIcon' onClick={e => handleMenuClick(e)}>
                アイコン追加
              </button>
            </li>
            <li>
              <button onClick={e => handleMenuClick(e)}>
                ログアウト
              </button>
            </li>
            <li>
              <button onClick={() => setIsMenuOpen(false)}>
                閉じる
              </button>
            </li>
          </ul>
        </aside>
      }
      {/*以上ハンバーガーMenu*/}
    </aside>
  )
}

export default DashboardHamburgerMenu;