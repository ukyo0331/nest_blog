import { FC, useState } from 'react';

type HamburgerMenuType = {
  handleMenuClick: (e: React.MouseEvent) => void
}

const HamburgerMenu: FC<HamburgerMenuType> = ({handleMenuClick}) => {
  //メニューボタンが押されたかどうかを判定するstate
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <aside>
      <button
        onClick={() => setIsMenuOpen(true)}
        className='fixed absolute right-0 bg-blue-800 md:hidden'
      >
        Menu
      </button>
      {isMenuOpen
        ?
        <aside
          className='md:hidden absolute bg-blue-400 w-[50%] h-full z-10'
          onClick={() => setIsMenuOpen(false)}
        >
          <ul>
            <li>
              <button id='create' onClick={e => handleMenuClick(e)}>
                記事作成
              </button>
            </li>
            <li>
              <button id='draft' onClick={e => handleMenuClick(e)}>
                下書き一覧
              </button>
            </li>
            <li>
              <button id='article' onClick={e => handleMenuClick(e)}>
                記事一覧
              </button>
            </li>
            <li>
              <button id='comment' onClick={e => handleMenuClick(e)}>
                コメント一覧
              </button>
            </li>
            <li>
              <button id='addIcon' onClick={e => handleMenuClick(e)}>
                アイコン追加
              </button>
            </li>
            <li>
              <button id='create' onClick={e => handleMenuClick(e)}>
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
        :
        null
      }
      {/*以上ハンバーガーMenu*/}
    </aside>
  )
}

export default HamburgerMenu;