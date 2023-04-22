import { ReactNode, FC } from "react";
import Head from "next/head";
import Header from './Header';
import Footer from './Footer';

type Props = {
    children: ReactNode,
    title: string,
    desc: string,
}
//共通のレイアウト
const Layout: FC<Props> = ({children, desc, title = 'YUTA CODE.'}) => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center'>
            <Head>
              <title>{title}</title>
              <meta name="description" content={desc} />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.11.1/tocbot.css" />
            </Head>
          <Header/>
          <main className='flex w-screen flex-1 flex-col items-center justify-center bg-[#F5F5F5] mt-16'>
                {children}
          </main>
          <Footer/>
        </div>
    )
}

export default Layout;