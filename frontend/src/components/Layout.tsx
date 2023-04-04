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
const Layout: FC<Props> = ({children, title = 'Next.js', desc}) => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center'>
            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
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