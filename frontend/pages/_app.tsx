import '../styles/globals.css';
import type { AppProps } from 'next/app';
import axios from "axios";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //APIへのfetchに失敗した場合のリトライを無効化
      retry: false,
      //windowにfocusを当てた際のfetchを無効化
      refetchOnWindowFocus: false
    },
  },
});

function MyApp({Component, pageProps }: AppProps) {
  //front back間でcookieのやりとりを行うための設定
  axios.defaults.withCredentials = true;
  //アプリケーションがロードした時にcsrf tokenを取得
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      )
      //axiosのデフォルト設定でheaderにcsrf tokenを付与
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken();
  }, [])
  return (
      <QueryClientProvider client={queryClient}>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light',
            }}
        >
          <Component {...pageProps} />
        </MantineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
  );
}

export default MyApp;
