import type { NextPage } from 'next'
import Head from 'next/head'

const Custom404: NextPage = () => {
    return (
        <div>
            <Head>
                <title>not found</title>
                <meta name="description" content="not foundページです" />
            </Head>
            <main>
                <div className='flex justify-center items-center h-[calc(100vh-50px)]'>
                    <h1>404 - Page Not Found</h1>
                </div>
            </main>
        </div>
    );
};

export default Custom404;