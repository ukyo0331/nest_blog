import type { NextPage } from 'next'
import Layout from "../src/components/Layout";

const Custom404: NextPage = () => {
    return (
        <>
            <Layout title='not found' desc='ページが見つかりません'>
                <div className='flex justify-center items-center h-[calc(100vh-50px)]'>
                    <h1>404 - Page Not Found</h1>
                </div>
            </Layout>
        </>
    );
};

export default Custom404;