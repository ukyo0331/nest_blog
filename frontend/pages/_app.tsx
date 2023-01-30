import '../styles/globals.css';
import type { AppProps } from 'next/app';
import axios from "axios";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
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
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken();
  }, [])
  return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
  );
}

export default MyApp;
